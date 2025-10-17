set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.rooms_with_metadata_for_user(p_user_id uuid)
 RETURNS TABLE(id uuid, owner_id uuid, title text, description text, type text, status text, location text, price numeric, commodities text[], rules text[], timings text[], who_is_living text[], contact text, created_at timestamp with time zone, updated_at timestamp with time zone, preferences jsonb, images text[], owner json, interaction json, verified json)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.owner_id,
    r.title,
    r.description,
    r.type,
    r.status,
    r.location,
    r.price,
    r.commodities,
    r.rules,
    r.timings,
    r.who_is_living,
    r.contact,
    r.created_at,
    r.updated_at,
    r.preferences,
    r.images,
    -- Owner anidado
    json_build_object(
      'id', u.id,
      'name', u.name,
      'avatar', u.avatar_url
    ) AS owner,
    -- Interacción solo del usuario actual
    json_build_object(
      'action', i.action,
      'last_action_at', i.last_action_at,
      'user_id', i.user_id
    ) AS interaction,
    -- Verified anidado
    json_build_object(
      'id', v.id,
      'verified_by', v.verified_by,
      'verification_type', v.verification_type,
      'verified_at', v.date,
      'notes', v.notes
    ) AS verified
  FROM rooms r
  LEFT JOIN users u ON r.owner_id = u.id
  LEFT JOIN room_user_interactions i
    ON i.room_id = r.id AND i.user_id = p_user_id
  LEFT JOIN room_verifications v ON v.room_id = r.id;
END;
$function$
;



