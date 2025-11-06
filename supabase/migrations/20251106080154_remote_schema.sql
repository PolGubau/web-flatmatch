set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.rooms_with_metadata(p_user_id uuid, location text DEFAULT NULL::text, min_price numeric DEFAULT NULL::numeric, max_price numeric DEFAULT NULL::numeric, page integer DEFAULT 0)
 RETURNS SETOF record
 LANGUAGE plpgsql
AS $function$
begin
  return query
  select
    r.id,
    r.owner_id,
    r.title,
    r.description,
    r.rent_type::text as type,
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
    json_build_object(
      'id', u.id,
      'name', u.name,
      'avatar', u.avatar_url
    ) as owner,
    json_build_object(
      'action', i.action,
      'last_action_at', i.last_action_at,
      'user_id', i.user_id
    ) as interaction,
    json_build_object(
      'id', v.id,
      'verified_by', v.verified_by,
      'verification_type', v.verification_type,
      'verified_at', v.date,
      'notes', v.notes
    ) as verified
  from rooms r
  left join users u on r.owner_id = u.id
  left join room_user_interactions i on i.room_id = r.id and i.user_id = p_user_id
  left join room_verifications v on v.room_id = r.id
  where 
    r.status = 'available'
    and r.owner_id <> p_user_id
    and (location is null or r.location ilike '%' || location || '%')
    and (min_price is null or r.price >= min_price)
    and (max_price is null or r.price <= max_price)
  order by r.created_at desc
  limit 10
  offset (page * 10);
end;
$function$
;


