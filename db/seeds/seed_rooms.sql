-- Seed para tabla rooms con 10 rooms completos

INSERT INTO public.rooms (
    id, owner_id, title, description, rent_type, status, location, price, commodities, rules, timings, who_is_living, contact, preferences, images, created_at, updated_at
) VALUES

-- room_1
('f52cfcf3-8184-4bfd-a125-3fd2fbf34e6b'::uuid, '52dd4a12-ec1c-418c-b1f8-4fa12003df11'::uuid, 'Habitación luminosa en piso compartido en Gràcia', 'Habitación con cama doble, escritorio y balcón en un piso con estudiantes internacionales.', 'private-room', 'available', '{"address": "Carrer de Verdi 45", "city": "Barcelona", "country": "España", "lat": 41.4, "lng": 2.15, "postalCode": "08012"}'::jsonb, '{"amount": 480, "currency": "EUR", "isIncluded": false, "isNegotiable": true, "localePrice": "480 €", "paymentFrequency": "monthly", "additionalCosts": {"deposit": 500, "utilities": 50, "otherFees": 20}}'::jsonb, '{"room": {"area": 12, "bedType": "double", "hasBalcony": true, "hasPrivateBathroom": false, "hasWindow": true, "hasWorkingDesk": true, "isFurnished": true}, "whole": {"appliances": {"hasAirConditioning": false, "hasCoffeeMaker": true, "hasDishwasher": false, "hasDryer": false, "hasElevator": false, "hasHeating": true, "hasLaundry": true, "hasMicrowave": true, "hasOven": true, "hasRefrigerator": true, "hasTV": true, "hasWifi": true, "isWheelchairAccessible": false}, "area": 90, "areUtilitiesIncluded": false, "bathrooms": 1, "bedrooms": {"individual": 2, "shared": 1}, "extras": {"hasGarden": false, "hasParking": false, "hasPool": false, "hasTerrace": true}}}'::jsonb, '{"childrenAllowed": false, "coupleAllowed": false, "guestsAllowed": true, "partiesAllowed": false, "petsAllowed": false, "quietHours": {"from": "22:00", "to": "08:00"}, "smokingAllowed": false}'::jsonb, '{"availableFrom": "2025-09-01", "minimumStay": {"unit": "month", "value": 3}, "maximumStay": {"unit": "month", "value": 12}}'::jsonb, '{"currentTenants": {"female": 2, "male": 1, "other": 0}, "ownerLivesHere": false}'::jsonb, '{"owner": {"email": "jordi.puig@barcelona.com", "name": "Jordi Puig", "phone": "+34666666666"}}'::jsonb, '{"age": {"min": 20, "max": 35}, "currentOccupation": {"employed": true, "student": true, "unemployed": false, "other": false}, "gender": {"female": true, "male": true, "other": true}}'::jsonb, '{"cover": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop&ixlib=rb-4.1.0", "gallery": ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop&ixlib=rb-4.1.0", "https://images.unsplash.com/photo-1615800002234-05c4d488696c?w=500&auto=format&fit=crop&q=60", "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=500&auto=format&fit=crop&q=60"]}'::jsonb, '2024-07-10'::timestamptz, now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.rooms (
    id, owner_id, title, description, rent_type, status, location, price, commodities, rules, timings, who_is_living, contact, preferences, images, created_at, updated_at
) VALUES
-- room_2 (desde mock room_2)
('2b0d6d5e-5c2a-4f4f-9014-4d0c2d9b8c02'::uuid, '52dd4a12-ec1c-418c-b1f8-4fa12003df11'::uuid,
 'Habitación individual con baño privado en Eixample',
 'Cómoda habitación con cama individual, escritorio y baño privado en piso moderno y tranquilo.',
 'private-room', 'available',
 '{"address":"Carrer de Mallorca 120","city":"Barcelona","country":"España","lat":41.3902,"lng":2.1649,"postalCode":"08036"}'::jsonb,
 '{"amount":600,"currency":"EUR","isIncluded":true,"isNegotiable":false,"localePrice":"600 €","paymentFrequency":"monthly","additionalCosts":{"deposit":600,"utilities":0,"otherFees":0}}'::jsonb,
 '{"room":{"area":10,"bedType":"single","hasBalcony":false,"hasPrivateBathroom":true,"hasWindow":true,"hasWorkingDesk":true,"isFurnished":true},"whole":{"area":100,"areUtilitiesIncluded":true,"bathrooms":2,"bedrooms":{"individual":3,"shared":0},"extras":{"hasGarden":false,"hasParking":true,"hasPool":false,"hasTerrace":false},"appliances":{"hasAirConditioning":true,"hasCoffeeMaker":true,"hasDishwasher":true,"hasDryer":true,"hasElevator":true,"hasHeating":true,"hasLaundry":true,"hasMicrowave":true,"hasOven":true,"hasRefrigerator":true,"hasTV":true,"hasWifi":true,"isWheelchairAccessible":true}}}'::jsonb,
 '{"childrenAllowed":false,"coupleAllowed":false,"guestsAllowed":false,"partiesAllowed":false,"petsAllowed":false,"quietHours":{"from":"22:00","to":"08:00"},"smokingAllowed":false}'::jsonb,
 '{"availableFrom":"2025-10-01","minimumStay":{"unit":"month","value":6},"maximumStay":{"unit":"month","value":12}}'::jsonb,
 '{"currentTenants":{"female":0,"male":2,"other":0},"ownerLivesHere":false}'::jsonb,
 '{"owner":{"email":"lucia@eixampleliving.es","name":"Lucía Gómez","phone":"+34678901234"}}'::jsonb,
 '{"age":{"min":22,"max":30},"currentOccupation":{"employed":true,"student":true,"unemployed":false,"other":false},"gender":{"female":true,"male":true,"other":false}}'::jsonb,
 '{"cover":"https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=500&auto=format&fit=crop&q=60","gallery":["https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=500&auto=format&fit=crop&q=60"]}'::jsonb,
 '2024-07-12'::timestamptz, now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.rooms (
    id, owner_id, title, description, rent_type, status, location, price, commodities, rules, timings, who_is_living, contact, preferences, images, created_at, updated_at
) VALUES
-- room_3 (desde mock room_3)
('3f1c8a91-2e7d-4d5b-b9b4-9a8ff24cdb03'::uuid, '52dd4a12-ec1c-418c-b1f8-4fa12003df11'::uuid,
 'Habitación amplia con terraza en Sants',
 'Espaciosa habitación doble con salida a terraza privada, ideal para parejas o trabajadores.',
 'private-room', 'booked',
 '{"address":"Carrer de Sants 202","city":"Barcelona","country":"España","lat":41.3758,"lng":2.1343,"postalCode":"08028"}'::jsonb,
 '{"amount":700,"currency":"EUR","isIncluded":false,"isNegotiable":false,"localePrice":"700 €","paymentFrequency":"monthly","additionalCosts":{"deposit":700,"utilities":60,"otherFees":0}}'::jsonb,
 '{"room":{"area":18,"bedType":"double","hasBalcony":false,"hasPrivateBathroom":false,"hasWindow":true,"hasWorkingDesk":true,"isFurnished":true},"whole":{"area":70,"areUtilitiesIncluded":false,"bathrooms":1,"bedrooms":{"individual":3,"shared":0},"extras":{"hasGarden":false,"hasParking":false,"hasPool":false,"hasTerrace":true},"appliances":{"hasAirConditioning":true,"hasCoffeeMaker":false,"hasDishwasher":false,"hasDryer":false,"hasElevator":true,"hasHeating":false,"hasLaundry":true,"hasMicrowave":true,"hasOven":true,"hasRefrigerator":true,"hasTV":true,"hasWifi":true,"isWheelchairAccessible":false}}}'::jsonb,
 '{"childrenAllowed":false,"coupleAllowed":true,"guestsAllowed":true,"partiesAllowed":false,"petsAllowed":true,"quietHours":{"from":"23:00","to":"07:00"},"smokingAllowed":true}'::jsonb,
 '{"availableFrom":"2025-09-15","minimumStay":{"unit":"month","value":2},"maximumStay":{"unit":"month","value":6}}'::jsonb,
 '{"currentTenants":{"female":1,"male":0,"other":0},"ownerLivesHere":true}'::jsonb,
 '{"owner":{"email":"marc@pisosants.com","name":"Marc Riera","phone":"+34932123456"}}'::jsonb,
 '{"age":{"min":25,"max":40},"currentOccupation":{"employed":true,"student":false,"unemployed":false,"other":false},"gender":{"female":true,"male":true,"other":true}}'::jsonb,
 '{"cover":"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop&q=60","gallery":["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1615800002234-05c4d488696c?w=500&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=500&auto=format&fit=crop&q=60"]}'::jsonb,
 '2024-07-15'::timestamptz, now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.rooms (
    id, owner_id, title, description, rent_type, status, location, price, commodities, rules, timings, who_is_living, contact, preferences, images, created_at, updated_at
) VALUES
-- room_4 (desde mock room_4)
('4a9e7c52-1d3f-4c6a-8d26-5f2b7e1a9d04'::uuid, '52dd4a12-ec1c-418c-b1f8-4fa12003df11'::uuid,
 'Habitación económica en piso familiar en El Clot',
 'Ideal para estudiantes con presupuesto ajustado, en zona bien comunicada y tranquila.',
 'private-room', 'available',
 '{"address":"Carrer de Rogent 78","city":"Barcelona","country":"España","lat":41.411,"lng":2.1895,"postalCode":"08026"}'::jsonb,
 '{"amount":350,"currency":"EUR","isIncluded":false,"isNegotiable":true,"localePrice":"350 €","paymentFrequency":"monthly","additionalCosts":{"deposit":300,"utilities":40,"otherFees":0}}'::jsonb,
 '{"room":{"area":8,"bedType":"single","hasBalcony":false,"hasPrivateBathroom":false,"hasWindow":true,"hasWorkingDesk":true,"isFurnished":true},"whole":{"area":70,"areUtilitiesIncluded":false,"bathrooms":1,"bedrooms":{"individual":2,"shared":0},"extras":{"hasGarden":false,"hasParking":false,"hasPool":false,"hasTerrace":false},"appliances":{"hasAirConditioning":false,"hasCoffeeMaker":false,"hasDishwasher":false,"hasDryer":false,"hasElevator":false,"hasHeating":true,"hasLaundry":true,"hasMicrowave":true,"hasOven":true,"hasRefrigerator":true,"hasTV":false,"hasWifi":true,"isWheelchairAccessible":false}}}'::jsonb,
 '{"childrenAllowed":false,"coupleAllowed":false,"guestsAllowed":false,"partiesAllowed":false,"petsAllowed":false,"quietHours":{"from":"22:30","to":"07:30"},"smokingAllowed":false}'::jsonb,
 '{"availableFrom":"2025-08-20","minimumStay":{"unit":"month","value":1},"maximumStay":{"unit":"month","value":6}}'::jsonb,
 '{"currentTenants":{"female":1,"male":0,"other":0},"ownerLivesHere":true}'::jsonb,
 '{"owner":{"email":"teresa@hogarfamiliar.com","name":"Teresa López","phone":"+34666666667"}}'::jsonb,
 '{"age":{"min":18,"max":28},"currentOccupation":{"employed":false,"student":true,"unemployed":false,"other":false},"gender":{"female":true,"male":false,"other":false}}'::jsonb,
 '{"cover":"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop&q=60","gallery":["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1615800002234-05c4d488696c?w=500&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=500&auto=format&fit=crop&q=60"]}'::jsonb,
 '2024-06-30'::timestamptz, now())
ON CONFLICT (id) DO NOTHING;
