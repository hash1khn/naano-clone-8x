export const COMMUNITY_SLACK_URL =
  "https://join.slack.com/t/naanocreators/shared_invite/zt-44utau9qa-KhDpHp9UF6feiN5g03z9bg";

export type CommunityLeaderboardRow = {
  rank: number;
  name: string;
  avatarUrl: string | null;
  slug: string | null;
  value: number;
  verified: boolean;
  isCurrent: boolean;
};

export type CommunityLeaderboard = {
  impressionsKind: string;
  impressionsPeriod: string;
  postsPeriod: string;
  leaderboardLimit: number;
  impressions: CommunityLeaderboardRow[];
  posts: CommunityLeaderboardRow[];
  current: {
    impressions: CommunityLeaderboardRow | null;
    posts: CommunityLeaderboardRow | null;
  };
};

export const demoCommunityLeaderboard: CommunityLeaderboard = {
  "impressionsKind": "estimated_naano_collaboration_total",
  "impressionsPeriod": "all_time",
  "postsPeriod": "all_time",
  "leaderboardLimit": 30,
  "impressions": [
    {
      "rank": 1,
      "name": "Eric Djavid",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/0846b7a0-4f1f-4d8b-842c-0dc5b2dcfed9/avatar-linkedin-5ad85bae6c1b96d57bb8.jpg",
      "slug": "eric-djavid",
      "value": 264978,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 2,
      "name": "Thomas Marcelle",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/20a93bcc-1ead-4189-acc2-e83ad7ae9186/avatar-linkedin-2366a6090ae30341105d.jpg",
      "slug": "thomas-marcelle",
      "value": 169990,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 3,
      "name": "Joseph Rudd",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/104d7bde-b197-4284-aa85-3622a4243bd7/avatar-linkedin-8b360ee369c4e3705c55.jpg",
      "slug": "joseph-rudd",
      "value": 147607,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 4,
      "name": "Emma Guetta",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/40ab066c-bb92-4993-9a49-f0ddbdefd3d8/avatar-linkedin-e8ef966584efe1613129.jpg",
      "slug": null,
      "value": 135350,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 5,
      "name": "Kevin Meyer",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/44859128-1711-41d4-b547-83331584f2e8/avatar-linkedin-84fddcbfbbb99c01d173.jpg",
      "slug": "kevin-meyer",
      "value": 64883,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 6,
      "name": "Raj Vaibhav",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/b4005354-f1d9-4dc1-a4cc-b3466f9ee413/avatar-linkedin-e37450703632ba70086d.jpg",
      "slug": "raj-vaibhav",
      "value": 45070,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 7,
      "name": "TEODORA VUKASINOVIC",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/44f429eb-269e-4a72-b717-272a47fd1286/avatar-linkedin-1e8a61b71026689c03c8.jpg",
      "slug": null,
      "value": 44625,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 8,
      "name": "Anthony Quinchon",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/9b3357d6-eb0b-4d2d-b0ca-8c9837ae00c1/avatar-linkedin-06ae529952282b6c1723.jpg",
      "slug": null,
      "value": 42694,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 9,
      "name": "Amber Cheema",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/478ae93f-7a52-48fc-a470-e8204c01b7d1/avatar-linkedin-e506edfeb150989737d5.jpg",
      "slug": null,
      "value": 32158,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 10,
      "name": "Dr Bart  Jaworski",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/75b0b57f-04bc-4ac0-8a4c-9a078d24b564/avatar-linkedin-2b9779585ea967fa7165.jpg",
      "slug": "dr-bart-jaworski",
      "value": 31088,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 11,
      "name": "Mejda Dihi",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/921578de-9cac-448d-9d18-8baa87542bff/avatar-linkedin-3fecc68b24dca1953557.jpg",
      "slug": "mejda-dihi",
      "value": 25889,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 12,
      "name": "Mehdi Tatepoire",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/c2003aa0-75ac-4767-ba62-76dfc65a6077/avatar-linkedin-379fc6c698749751781f.jpg",
      "slug": "mehdi-tatepoire",
      "value": 23963,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 13,
      "name": "Sandhya Mishra",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/d0854449-bfd1-4301-bea4-fc7fd4dc86b1/avatar-linkedin-4b81bf2254beb65ec0c5.jpg",
      "slug": "sandhya-mishra",
      "value": 23367,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 14,
      "name": "Tomas Loucky",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/a4b6dbcf-db66-4127-8f2b-77f7b08b6329/avatar-linkedin-a53c9b9f63e6233b48cd.jpg",
      "slug": "tomas-loucky",
      "value": 22615,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 15,
      "name": "malmoum chorouk",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/0ec0e1ee-b4f3-4d6b-9713-1e440fa66ed2/avatar-linkedin-3501cbf5bb0f04bbce3e.jpg",
      "slug": "malmoum-chorouk",
      "value": 21630,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 16,
      "name": "Divyanshi sharma",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/86f4a288-2982-4313-a17b-3bd9ce59ef2d/avatar-linkedin-dd225e3590fd7019f210.jpg",
      "slug": null,
      "value": 19806,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "Robin Tempe",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/c311f408-294b-4f18-972e-978a6c092af2/avatar-linkedin-19451a71888cb5ca92ea.jpg",
      "slug": null,
      "value": 19700,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 18,
      "name": "Nick Palasz",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/58bfc7eb-714b-4023-8f64-f05f3f63b168/avatar-linkedin-73048e1049218ba644c1.jpg",
      "slug": null,
      "value": 15130,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 19,
      "name": "Thomas CLEMENT",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/f34d901a-361c-4c28-909b-978649a5eede/avatar-linkedin-8b95f24fb5f196d03166.jpg",
      "slug": "thomas-clement",
      "value": 13970,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 20,
      "name": "Jorge Branger",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/05b133c2-a586-4a6f-b87c-8a602f6ccf9b/avatar-linkedin-ab8a8774832bd9c2a44c.jpg",
      "slug": "jorge-branger",
      "value": 13519,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 21,
      "name": "Yonathan Cohen",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/cd858ef2-419f-44f2-b9cb-2d4090039604/avatar-linkedin-4905ae9b9dec60511a9b.jpg",
      "slug": null,
      "value": 12920,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 22,
      "name": "Yonathan levy",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/4cf93adc-005c-425a-8252-5fec3d01446c/avatar-linkedin-d9bff9141c4cc1618d0a.jpg",
      "slug": "yonathan-levy",
      "value": 12730,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 23,
      "name": "Julius Nylund",
      "avatarUrl": "https://xmkjfgxfwkcwdnqmstur.supabase.co/storage/v1/object/public/avatars/9270bdd8-9b27-42db-9156-c0dc78b745d9/avatar-linkedin-8aa0420e6cfd397fb09f.jpg",
      "slug": null,
      "value": 11409,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 24,
      "name": "Brianna Chapman",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/bd3ca2a1-bb14-4e48-8518-e18f5392084c/avatar-linkedin-a5ab6422a3d1d174d539.jpg",
      "slug": null,
      "value": 10397,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 25,
      "name": "Lazarus Danjuma",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/8f197c1f-4d14-4975-b6db-2dc08c3699c7/avatar-linkedin-2e9f644e0d844aeea300.jpg",
      "slug": "lazarus-danjuma",
      "value": 9910,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 26,
      "name": "Théophile Burnet",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/f28f0030-670d-4278-b133-d2960f7186e7/avatar-linkedin-4c09367ecf795053cef7.jpg",
      "slug": null,
      "value": 9100,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 27,
      "name": "Kashmala Malik",
      "avatarUrl": "https://xmkjfgxfwkcwdnqmstur.supabase.co/storage/v1/object/public/avatars/55d56c40-e8e9-41fe-a198-00da01c1b3c5/avatar-linkedin-84a556905ef22c7e5499.jpg",
      "slug": null,
      "value": 8570,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 28,
      "name": "Dilem Kaya",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/0855311a-8fbf-4bf0-a658-ac8ab9c195da/avatar-linkedin-1241a838bbecb0cab688.jpg",
      "slug": "dilem-kaya",
      "value": 8541,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 29,
      "name": "Can Timagur",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/4ff92d13-b9a0-4e16-bf2b-ea3b67f79f7c/avatar-linkedin-01138af19e7f0e1dfa0e.jpg",
      "slug": null,
      "value": 7933,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 30,
      "name": "Raouf Lemouchi",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/b6077d01-4c60-47af-af1d-58e1bafec22c/avatar-linkedin-57aad2cc751ba06aa50b.jpg",
      "slug": null,
      "value": 7795,
      "verified": false,
      "isCurrent": false
    }
  ],
  "posts": [
    {
      "rank": 1,
      "name": "Joseph Rudd",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/104d7bde-b197-4284-aa85-3622a4243bd7/avatar-linkedin-8b360ee369c4e3705c55.jpg",
      "slug": "joseph-rudd",
      "value": 8,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 1,
      "name": "Thomas Marcelle",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/20a93bcc-1ead-4189-acc2-e83ad7ae9186/avatar-linkedin-2366a6090ae30341105d.jpg",
      "slug": "thomas-marcelle",
      "value": 8,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 3,
      "name": "Eric Djavid",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/0846b7a0-4f1f-4d8b-842c-0dc5b2dcfed9/avatar-linkedin-5ad85bae6c1b96d57bb8.jpg",
      "slug": "eric-djavid",
      "value": 7,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 3,
      "name": "Julius Nylund",
      "avatarUrl": "https://xmkjfgxfwkcwdnqmstur.supabase.co/storage/v1/object/public/avatars/9270bdd8-9b27-42db-9156-c0dc78b745d9/avatar-linkedin-8aa0420e6cfd397fb09f.jpg",
      "slug": null,
      "value": 7,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 5,
      "name": "Kevin Meyer",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/44859128-1711-41d4-b547-83331584f2e8/avatar-linkedin-84fddcbfbbb99c01d173.jpg",
      "slug": "kevin-meyer",
      "value": 6,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 6,
      "name": "Anthony Quinchon",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/9b3357d6-eb0b-4d2d-b0ca-8c9837ae00c1/avatar-linkedin-06ae529952282b6c1723.jpg",
      "slug": null,
      "value": 5,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 6,
      "name": "Guillaume Samir Deramchi",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/a5e4bb8b-ffdf-4ffe-966a-ca3bc4069e17/avatar-linkedin-846f470dc94a938fbbc5.jpg",
      "slug": null,
      "value": 5,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 6,
      "name": "Raouf Lemouchi",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/b6077d01-4c60-47af-af1d-58e1bafec22c/avatar-linkedin-57aad2cc751ba06aa50b.jpg",
      "slug": null,
      "value": 5,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 9,
      "name": "Mejda Dihi",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/921578de-9cac-448d-9d18-8baa87542bff/avatar-linkedin-3fecc68b24dca1953557.jpg",
      "slug": "mejda-dihi",
      "value": 4,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 10,
      "name": "Emma Guetta",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/40ab066c-bb92-4993-9a49-f0ddbdefd3d8/avatar-linkedin-e8ef966584efe1613129.jpg",
      "slug": null,
      "value": 3,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 10,
      "name": "Amarachi Enumah",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/44537a84-4271-4aa4-85fe-f996b847f58e/avatar-linkedin-63e8f40b9d7ec6520697.jpg",
      "slug": null,
      "value": 3,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 10,
      "name": "Nick Palasz",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/58bfc7eb-714b-4023-8f64-f05f3f63b168/avatar-linkedin-73048e1049218ba644c1.jpg",
      "slug": null,
      "value": 3,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 10,
      "name": "Thomas Traineau",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/5b86e2a8-41f8-4ce2-bba9-f197bafa942b/avatar-linkedin-14ca01bee82628e3684b.jpg",
      "slug": null,
      "value": 3,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 10,
      "name": "Raj Vaibhav",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/b4005354-f1d9-4dc1-a4cc-b3466f9ee413/avatar-linkedin-e37450703632ba70086d.jpg",
      "slug": "raj-vaibhav",
      "value": 3,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 10,
      "name": "Mehdi Tatepoire",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/c2003aa0-75ac-4767-ba62-76dfc65a6077/avatar-linkedin-379fc6c698749751781f.jpg",
      "slug": "mehdi-tatepoire",
      "value": 3,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 10,
      "name": "Alexis Jarre",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/fb769e80-1b3b-4e82-8c8b-2f7086e8dd95/avatar-linkedin-4f7f49770c49b7f5cb8d.jpg",
      "slug": "alexis-jarre",
      "value": 3,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "Jorge Branger",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/05b133c2-a586-4a6f-b87c-8a602f6ccf9b/avatar-linkedin-ab8a8774832bd9c2a44c.jpg",
      "slug": "jorge-branger",
      "value": 2,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "Muqaddas Khalid",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/23a435b0-1a79-40c6-896b-016cb0bd2818/avatar-linkedin-7fc432682b726fabf187.jpg",
      "slug": "muqaddas-khalid",
      "value": 2,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "Loïs Guillermond",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/25a97584-c527-4f20-a54e-4957efc09d76/avatar-linkedin-12dad423b728883ba22f.jpg",
      "slug": "lois-guillermond",
      "value": 2,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "TEODORA VUKASINOVIC",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/44f429eb-269e-4a72-b717-272a47fd1286/avatar-linkedin-1e8a61b71026689c03c8.jpg",
      "slug": null,
      "value": 2,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "Amber Cheema",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/478ae93f-7a52-48fc-a470-e8204c01b7d1/avatar-linkedin-e506edfeb150989737d5.jpg",
      "slug": null,
      "value": 2,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "Anouar Martin",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/8c94de9f-0543-4efd-8bbc-d52b9de7c8ee/avatar-linkedin-4388e29a835809b4c916.jpg",
      "slug": "anouar-martin",
      "value": 2,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "Aya Dara",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/c06cf3d9-38bb-4724-881f-a73e71708375/avatar-linkedin-148b9109649bcd82ef56.jpg",
      "slug": null,
      "value": 2,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "Robin Tempe",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/c311f408-294b-4f18-972e-978a6c092af2/avatar-linkedin-19451a71888cb5ca92ea.jpg",
      "slug": null,
      "value": 2,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "Holly Grace Callis",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/c3b7e140-b81f-46aa-bd0c-9cdbe7ac7a26/avatar-linkedin-fa87716bbf4e78c2477c.jpg",
      "slug": "holly-grace-callis",
      "value": 2,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "Ugo Sartini",
      "avatarUrl": "https://xmkjfgxfwkcwdnqmstur.supabase.co/storage/v1/object/public/avatars/eb21d10a-e623-4ad6-a40f-3c31acdc9759/avatar-oauth-1777961360854.jpg",
      "slug": null,
      "value": 2,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "Thomas CLEMENT",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/f34d901a-361c-4c28-909b-978649a5eede/avatar-linkedin-8b95f24fb5f196d03166.jpg",
      "slug": "thomas-clement",
      "value": 2,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "Alexandre Jeanpetit",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/f8b6000b-f63b-42ea-8b0f-f80e217d33e9/avatar-linkedin-842e4eaafce3f8b9e016.jpg",
      "slug": "alexandre-jeanpetit",
      "value": 2,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "Tomas Medeckis",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/f94e8da7-2686-4a1a-a63a-0424ca8d1b29/avatar-linkedin-391463e0216cfcde8194.jpg",
      "slug": "tomas-medeckis",
      "value": 2,
      "verified": false,
      "isCurrent": false
    },
    {
      "rank": 17,
      "name": "Finlay MacNaughton",
      "avatarUrl": "https://api.naano.xyz/storage/v1/object/public/avatars/fd34df1f-0724-49c7-8395-10569fcaad4b/avatar-linkedin-6ce08576a6bfafe5c7c5.jpg",
      "slug": "finlay-macnaughton",
      "value": 2,
      "verified": false,
      "isCurrent": false
    }
  ],
  "current": {
    "impressions": null,
    "posts": null
  }
};
