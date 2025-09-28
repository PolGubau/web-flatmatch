alter type "public"."Gender" rename to "Gender__old_version_to_be_dropped";

create type "public"."Gender" as enum ('male', 'female', 'non_binary', 'prefer_not_to_say');

drop type "public"."Gender__old_version_to_be_dropped";



