import { contactDatabaseFactory } from "Renderer/models/phone/phone.helpers"
import { Phone } from "Renderer/models/phone/phone.typings"

export const phoneSeedInput = [
  {
    id: "0",
    firstName: "Sławomir",
    lastName: "Borewicz",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "milicjant@buziaczek.pl",
    note: "sapiente rem dignissimos sunt",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "Malczewskiego 3, Warszawa",
    secondAddressLine: "",
  },
  {
    id: "274970a2-13b7-4f42-962d-8fa0b2b48377",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "Lavina_Bartoletti@yahoo.com",
    note: "sapiente rem dignissimos sunt",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "3284 Klocko Plains",
    secondAddressLine: "",
  },
  {
    id: "a664baed-09be-4698-b9ea-69849986b055",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "Crystel_Prosacco@yahoo.com",
    note: "voluptatem expedita vel",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "55727 Kelly Expressway",
    secondAddressLine: "",
  },
  {
    id: "40a66803-5a7a-4ee0-bc46-154412d86532",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+67 558 173 266",
    email: "",
    note: "ipsum numquam fugiat",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "Estevanburgh",
  },
  {
    id: "026630e7-31b7-4e49-8590-b527cfb98e31",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+57 523 983 615",
    email: "",
    note: "dolorem",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "Lake Lonie",
  },
  {
    id: "7173eddd-a533-4f1d-a09d-f1fec74d29f9",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "+85 102 096 521",
    secondaryPhoneNumber: "+04 349 051 883",
    email: "Jennifer87@gmail.com",
    note: "sequi recusandae eveniet",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "36324 Norval Flat",
    secondAddressLine: "",
  },
  {
    id: "0af18bca-00e5-45a1-9332-18f54e38e64a",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "+62 100 679 683",
    secondaryPhoneNumber: "",
    email: "",
    note: "quibusdam autem neque consequatur",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "Effertzchester",
  },
  {
    id: "4a1d0314-c8f6-42f0-80f5-a32a24e7bf7b",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "+34 827 878 969",
    secondaryPhoneNumber: "+34 269 358 522",
    email: "Mertie_Daugherty@yahoo.com",
    note: "distinctio itaque",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "05994 Romaguera Bypass",
    secondAddressLine: "",
  },
  {
    id: "8f475281-3066-4eab-9f9f-ce4e164a3f6c",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "Sammie.Lockman30@hotmail.com",
    note: "culpa deserunt",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "80462 Bednar Courts",
    secondAddressLine: "",
  },
  {
    id: "3a8a3575-b9b6-4ec3-b60c-d7ce125968be",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+82 215 779 913",
    email: "Tiffany79@yahoo.com",
    note: "et corrupti fugit perspiciatis",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "6209 Ruth Ports",
    secondAddressLine: "",
  },
  {
    id: "0fb5a1b1-5d51-481f-87bd-e854c1b96bfb",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "sint quasi quis saepe",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "West Gaetano",
  },
  {
    id: "3bcfd5ef-8b13-4051-a19d-8f6cd841c4c4",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "Ephraim.Wehner@hotmail.com",
    note: "ducimus provident",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "New Coty",
  },
  {
    id: "a7df468b-d0da-4c93-8a79-4899c99d98ca",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "molestias et dolorum",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "Saulland",
  },
  {
    id: "663814bb-facc-459a-b9b3-7bc53d924b4c",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "minima dolorem vero eveniet",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "973 Mraz Knoll",
    secondAddressLine: "",
  },
  {
    id: "25ac8ab3-92a6-4ba2-a9ee-1afdd8492601",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "sed",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "Hardytown",
  },
  {
    id: "eca476be-9e0a-4eb1-a3a9-041aa93d3158",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "+69 882 436 329",
    secondaryPhoneNumber: "+35 367 396 904",
    email: "",
    note: "saepe laboriosam",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "77170 MacGyver Pine",
    secondAddressLine: "Uptontown",
  },
  {
    id: "e060344b-aded-48a5-adc0-1f321629093a",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "aut rerum",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "980 Feeney Bypass",
    secondAddressLine: "",
  },
  {
    id: "668cd516-0339-4321-b196-fd69ea9f52fa",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+89 580 922 946",
    email: "",
    note: "harum aut quia",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "9885 Lavinia Village",
    secondAddressLine: "",
  },
  {
    id: "10f81e04-2eed-4074-9a8f-3400668d99ea",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "+03 176 921 907",
    secondaryPhoneNumber: "",
    email: "Nora_Dooley90@yahoo.com",
    note: "voluptate quis est et",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "1301 Gaylord Divide",
    secondAddressLine: "",
  },
  {
    id: "63cd8522-f4eb-4bdd-a916-a6d5647e89f9",
    firstName: "",
    lastName: "Abernathy",
    primaryPhoneNumber: "+78 722 986 805",
    secondaryPhoneNumber: "",
    email: "",
    note: "eum",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "65c4eb42-d365-42f2-8b46-4098b62c11f4",
    firstName: "Alberto",
    lastName: "Rutherford",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "et sunt omnis",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "478 Reilly Meadow",
    secondAddressLine: "East Belle",
  },
  {
    id: "e3c829c8-c3e5-4ee4-bc44-77bb0ea9f31d",
    firstName: "Alec",
    lastName: "Langosh",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+64 005 492 837",
    email: "",
    note: "tempore non",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "7c2e2dd1-829b-4dc6-9fec-446ca540796b",
    firstName: "Alvena",
    lastName: "Smith",
    primaryPhoneNumber: "+46 259 068 647",
    secondaryPhoneNumber: "",
    email: "",
    note: "at consectetur ducimus",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "13e08342-fc32-4f29-9839-73fcbb25f2ba",
    firstName: "Alycia",
    lastName: "Torphy",
    primaryPhoneNumber: "+41 764 465 510",
    secondaryPhoneNumber: "",
    email: "",
    note: "consequuntur sapiente aspernatur",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "f5b8b756-62fb-4580-a101-2c4b1aa27c0b",
    firstName: "Anya",
    lastName: "VonRueden",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+83 489 610 269",
    email: "",
    note: "fugiat qui",
    ice: true,
    favourite: true,
    blocked: false,
    speedDial: 3,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "91da4962-6eea-4b80-ad93-00c30951d9b5",
    firstName: "Ara",
    lastName: "Romaguera",
    primaryPhoneNumber: "+16 822 299 812",
    secondaryPhoneNumber: "+97 763 876 593",
    email: "Ara_Romaguera@hotmail.com",
    note: "provident quos nulla ipsum",
    ice: false,
    favourite: false,
    blocked: false,
    speedDial: 2,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "3d1fed41-13f0-4f8f-a24d-cb7f3db03fec",
    firstName: "Breanne",
    lastName: "Kessler",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+06 587 355 881",
    email: "Breanne_Kessler27@yahoo.com",
    note: "qui possimus",
    ice: false,
    favourite: false,
    blocked: false,
    speedDial: 7,
    firstAddressLine: "6618 Veum Turnpike",
    secondAddressLine: "",
  },
  {
    id: "b57f8a65-d9eb-465e-ba99-00854b615376",
    firstName: "Camille",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+32 133 406 878",
    email: "",
    note: "nihil",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "45453 Clarabelle Alley",
    secondAddressLine: "",
  },
  {
    id: "ae193f79-a65b-4b36-bef7-b6b6532811ca",
    firstName: "Carmelo",
    lastName: "",
    primaryPhoneNumber: "+98 007 298 780",
    secondaryPhoneNumber: "",
    email: "",
    note: "autem mollitia doloremque",
    ice: false,
    favourite: true,
    blocked: false,
    speedDial: 8,
    firstAddressLine: "935 Gwen Park",
    secondAddressLine: "",
  },
  {
    id: "d279cf18-f41f-4250-ae7f-b5b0d43356f2",
    firstName: "Carolanne",
    lastName: "Muller",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+76 183 875 554",
    email: "",
    note: "quasi suscipit sit",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "Rennerfurt",
  },
  {
    id: "9b20b1b0-4d04-45b8-a923-7b36a81745ab",
    firstName: "",
    lastName: "Cassin",
    primaryPhoneNumber: "+52 206 735 918",
    secondaryPhoneNumber: "+76 542 064 436",
    email: "",
    note: "rerum consequatur qui quia",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "5630 Yundt Motorway",
    secondAddressLine: "Legroshaven",
  },
  {
    id: "957cf634-a2d7-4dc3-a1b2-777e583e5cfc",
    firstName: "",
    lastName: "Dibbert",
    primaryPhoneNumber: "+59 205 022 697",
    secondaryPhoneNumber: "+20 296 554 649",
    email: "",
    note: "quia cum",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "6232644d-c99d-4f06-854c-47f32895a400",
    firstName: "",
    lastName: "Douglas",
    primaryPhoneNumber: "+33 680 710 295",
    secondaryPhoneNumber: "+51 343 236 920",
    email: "Brando39@hotmail.com",
    note: "aut voluptate nisi sit",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "81c60775-cb4d-409f-98a1-79c785bb083a",
    firstName: "Dylan",
    lastName: "Kuvalis",
    primaryPhoneNumber: "+36 724 240 162",
    secondaryPhoneNumber: "+72 193 166 345",
    email: "Dylan.Kuvalis90@hotmail.com",
    note: "possimus",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "593cbb53-a8e7-48ca-8fa5-e18d525ea1f6",
    firstName: "Edmund",
    lastName: "",
    primaryPhoneNumber: "+46 333 060 911",
    secondaryPhoneNumber: "",
    email: "",
    note: "temporibus molestiae",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "016 McClure Curve",
    secondAddressLine: "",
  },
  {
    id: "bbd11159-3981-4926-81b0-6975234e5083",
    firstName: "",
    lastName: "Effertz",
    primaryPhoneNumber: "+78 750 276 573",
    secondaryPhoneNumber: "",
    email: "Gilda42@hotmail.com",
    note: "explicabo aspernatur impedit velit",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "08979 Kathleen Garden",
    secondAddressLine: "West Everettefurt",
  },
  {
    id: "d37736af-1dab-45f0-9d72-9760e3e320a8",
    firstName: "Elisa",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "voluptates et dolorem ad",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "8035 Rempel Crescent",
    secondAddressLine: "Streichborough",
  },
  {
    id: "d1c2d520-62c3-4949-ab47-cf6b3b680242",
    firstName: "",
    lastName: "Erdman",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+31 892 096 285",
    email: "",
    note: "accusantium quod",
    ice: false,
    favourite: false,
    blocked: false,
    speedDial: 9,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "06740d8d-b3c6-4e91-bd00-0720ca451346",
    firstName: "",
    lastName: "Erdman",
    primaryPhoneNumber: "+35 160 648 062",
    secondaryPhoneNumber: "+76 403 872 863",
    email: "",
    note: "ut ut magni",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "f3cc3898-af0f-49be-8b75-0d3bdf3423f2",
    firstName: "Eugene",
    lastName: "",
    primaryPhoneNumber: "+31 137 043 005",
    secondaryPhoneNumber: "",
    email: "Eugene_Schulist17@gmail.com",
    note: "accusantium quos velit quo",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "63863 Fausto Points",
    secondAddressLine: "Trentonfort",
  },
  {
    id: "f4d3d0f0-33db-4498-80e3-0870046bbeb4",
    firstName: "Fannie",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "labore aut qui eum",
    ice: true,
    favourite: true,
    blocked: false,
    firstAddressLine: "0728 Kassulke Land",
    secondAddressLine: "",
  },
  {
    id: "fe4fb1b3-ddc0-43bc-89c5-ac3b3c1652b0",
    firstName: "",
    lastName: "Fay",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+39 129 113 181",
    email: "",
    note: "voluptatem quo et totam",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "374f6136-d17d-4eef-820a-ce634b3e856c",
    firstName: "",
    lastName: "Fritsch",
    primaryPhoneNumber: "+95 507 310 189",
    secondaryPhoneNumber: "+88 121 118 947",
    email: "Eleanora.Fritsch@hotmail.com",
    note: "aut",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "742 Nicolas Center",
    secondAddressLine: "",
  },
  {
    id: "036e1a36-cb4e-4705-9894-94cd299f79ce",
    firstName: "Giuseppe",
    lastName: "Leuschke",
    primaryPhoneNumber: "+92 946 859 697",
    secondaryPhoneNumber: "",
    email: "Giuseppe_Leuschke93@gmail.com",
    note: "et",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "1480 Upton Flat",
    secondAddressLine: "East Kearaville",
  },
  {
    id: "4b249425-b521-4eee-9f4f-84d081cd3b0f",
    firstName: "",
    lastName: "Grady",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "Trace59@hotmail.com",
    note: "possimus quasi optio rerum",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "2101 Daniel Tunnel",
    secondAddressLine: "Medhurstfort",
  },
  {
    id: "499cda8e-0d43-45e6-ac74-fc5de229b712",
    firstName: "Haleigh",
    lastName: "Dach",
    primaryPhoneNumber: "+27 672 602 904",
    secondaryPhoneNumber: "",
    email: "Haleigh.Dach@gmail.com",
    note: "distinctio",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "1820 Ziemann Via",
    secondAddressLine: "O'Connellburgh",
  },
  {
    id: "82b79f7b-8157-4314-9ece-480a64e794a0",
    firstName: "",
    lastName: "Haley",
    primaryPhoneNumber: "+03 834 831 784",
    secondaryPhoneNumber: "+83 296 311 479",
    email: "",
    note: "dignissimos aperiam",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "e3b2eddd-dbcc-4b79-9227-58abb7d45445",
    firstName: "",
    lastName: "Halvorson",
    primaryPhoneNumber: "+29 481 105 867",
    secondaryPhoneNumber: "",
    email: "",
    note: "ratione rerum aut dolores",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "01684 Otilia Flat",
    secondAddressLine: "South Ardella",
  },
  {
    id: "3e28f31c-cc73-4153-9285-907adcbde4da",
    firstName: "",
    lastName: "Hartmann",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "dolore voluptate porro",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "f0b50457-ecae-4dd5-b577-3ea53aed96ed",
    firstName: "",
    lastName: "Hayes",
    primaryPhoneNumber: "+08 341 329 760",
    secondaryPhoneNumber: "+82 192 423 122",
    email: "",
    note: "qui quibusdam",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "9e784662-f105-40ca-b869-abb2152a0b2c",
    firstName: "Heaven",
    lastName: "Ritchie",
    primaryPhoneNumber: "+93 794 940 260",
    secondaryPhoneNumber: "+90 497 907 015",
    email: "",
    note: "id rerum et magnam",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "841f7237-9bcd-45be-9eb9-263fdf9cce04",
    firstName: "Herminia",
    lastName: "Johnson",
    primaryPhoneNumber: "+00 304 132 588",
    secondaryPhoneNumber: "",
    email: "",
    note: "impedit ut cupiditate",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "a05a68a1-b889-404a-ae9b-26947849a387",
    firstName: "",
    lastName: "Homenick",
    primaryPhoneNumber: "+54 012 828 911",
    secondaryPhoneNumber: "",
    email: "",
    note: "repellat occaecati",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "bbe6e446-c724-4d07-ad1d-015f44a0b86a",
    firstName: "Ismael",
    lastName: "Boehm",
    primaryPhoneNumber: "+62 143 537 790",
    secondaryPhoneNumber: "",
    email: "Ismael.Boehm@hotmail.com",
    note: "minima consequatur hic",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "7301 Beer Haven",
    secondAddressLine: "",
  },
  {
    id: "a6b64f67-3329-4cd5-b29b-c0c22fac5333",
    firstName: "Jaunita",
    lastName: "Beatty",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "Jaunita_Beatty@yahoo.com",
    note: "ut aliquid ex",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "51926509-cdd5-40ff-a418-a733a4b4c73c",
    firstName: "Jayden",
    lastName: "Hermiston",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "Jayden80@gmail.com",
    note: "fugiat culpa",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "070349d0-3b7d-4185-9264-129242978254",
    firstName: "",
    lastName: "Johnston",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "quia aliquid non non",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "491 Kertzmann Locks",
    secondAddressLine: "North Horacio",
  },
  {
    id: "29812fa1-5eaa-4a05-a3cf-fe1e2ea9915a",
    firstName: "Jolie",
    lastName: "",
    primaryPhoneNumber: "+13 066 262 752",
    secondaryPhoneNumber: "",
    email: "",
    note: "adipisci voluptas",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "3297 Garrison Brooks",
    secondAddressLine: "",
  },
  {
    id: "6e25e79d-b478-4c94-a569-e17fdc51e681",
    firstName: "Jordi",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+69 869 765 474",
    email: "Jordi.Ondricka42@gmail.com",
    note: "nam quia rerum",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "New Guyberg",
  },
  {
    id: "90b36120-4d6b-4fbb-a7b1-f30398973a37",
    firstName: "Jovan",
    lastName: "Tremblay",
    primaryPhoneNumber: "+33 883 169 653",
    secondaryPhoneNumber: "+47 551 284 912",
    email: "Jovan_Tremblay@hotmail.com",
    note: "consequatur",
    ice: true,
    favourite: true,
    blocked: false,
    firstAddressLine: "043 Braulio Cape",
    secondAddressLine: "Lake Georgette",
  },
  {
    id: "68925ad8-b3a5-4935-8982-5249af63ecdd",
    firstName: "Kip",
    lastName: "",
    primaryPhoneNumber: "+90 408 860 501",
    secondaryPhoneNumber: "+92 822 230 673",
    email: "",
    note: "et",
    ice: false,
    favourite: false,
    blocked: false,
    speedDial: 5,
    firstAddressLine: "0692 Ara Rapids",
    secondAddressLine: "",
  },
  {
    id: "17f7da44-874f-46ab-8d71-ebdf59390d3b",
    firstName: "Kira",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "Kira.Wisozk72@yahoo.com",
    note: "nostrum dicta totam",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "3cfe4499-ff38-426d-8097-915014ddd8f2",
    firstName: "",
    lastName: "Koepp",
    primaryPhoneNumber: "+92 943 622 474",
    secondaryPhoneNumber: "+92 540 789 437",
    email: "Orpha79@hotmail.com",
    note: "possimus et doloremque ex",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "19856 Keegan Spurs",
    secondAddressLine: "New Eileen",
  },
  {
    id: "821b556e-d02f-4cb9-927b-dcbe98fd570d",
    firstName: "",
    lastName: "Labadie",
    primaryPhoneNumber: "+54 377 124 607",
    secondaryPhoneNumber: "+10 169 508 378",
    email: "Shanna.Labadie@gmail.com",
    note: "eius id",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "7771ed07-87f9-4869-b2eb-4f80fb75ce59",
    firstName: "",
    lastName: "Lehner",
    primaryPhoneNumber: "+98 042 412 563",
    secondaryPhoneNumber: "",
    email: "Pete_Lehner@yahoo.com",
    note: "repudiandae sint nihil perspiciatis",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "bd842f73-f532-4771-b58a-17e74e79b804",
    firstName: "Lemuel",
    lastName: "",
    primaryPhoneNumber: "+78 708 840 498",
    secondaryPhoneNumber: "",
    email: "Lemuel_Raynor71@gmail.com",
    note: "eligendi",
    ice: false,
    favourite: true,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "333af940-62c2-408c-87ee-b3a222429022",
    firstName: "Lina",
    lastName: "Ullrich",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+25 081 493 162",
    email: "Lina.Ullrich82@gmail.com",
    note: "atque aut exercitationem quia",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "2669 Kihn Alley",
    secondAddressLine: "West Gerda",
  },
  {
    id: "5a007ae6-452e-4469-a790-a7f478dfa3e3",
    firstName: "Lionel",
    lastName: "Maggio",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+28 612 289 967",
    email: "",
    note: "sunt praesentium",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "North Sylvan",
  },
  {
    id: "f2b4772d-bbf8-4b4f-a89a-ff66f74fdc29",
    firstName: "Loren",
    lastName: "Mosciski",
    primaryPhoneNumber: "+53 464 697 218",
    secondaryPhoneNumber: "+75 250 619 537",
    email: "",
    note: "tenetur",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "New Maybelleview",
  },
  {
    id: "b0d08d82-8150-4466-bd86-abd42cc3be63",
    firstName: "Lyric",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "Lyric_Lakin@hotmail.com",
    note: "et",
    ice: true,
    favourite: true,
    blocked: false,
    firstAddressLine: "1891 Darrick Bypass",
    secondAddressLine: "",
  },
  {
    id: "fdf69f8d-6c9c-4dc7-992c-972cc018cb15",
    firstName: "Mabelle",
    lastName: "Von",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+68 286 802 930",
    email: "",
    note: "tenetur voluptas",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "75fdc9ea-2e41-4c7c-b35f-ef3a818c3517",
    firstName: "Madisen",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+69 161 360 314",
    email: "Madisen.Muller@gmail.com",
    note: "atque",
    ice: false,
    favourite: true,
    blocked: false,
    firstAddressLine: "80283 Dashawn Mews",
    secondAddressLine: "",
  },
  {
    id: "44be44da-d33c-42cf-afbf-8c55263f48a9",
    firstName: "",
    lastName: "Marquardt",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+59 771 945 400",
    email: "",
    note: "placeat odit quidem dolorem",
    ice: false,
    favourite: false,
    blocked: false,
    speedDial: 6,
    firstAddressLine: "",
    secondAddressLine: "South Pamelahaven",
  },
  {
    id: "8f86b382-652b-4fa8-b88b-fecd33e21201",
    firstName: "",
    lastName: "Marvin",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "molestiae dicta ut",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "66831 Darrin Shoal",
    secondAddressLine: "Ellsworthshire",
  },
  {
    id: "d1471ac5-174d-4530-adda-1da8a0cf472c",
    firstName: "",
    lastName: "Marvin",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "Leta_Marvin92@hotmail.com",
    note: "omnis quia ea",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "53692 Giovanni Loop",
    secondAddressLine: "Port Chanelle",
  },
  {
    id: "c48349a9-dac4-4b33-b017-8900086f1c73",
    firstName: "Meaghan",
    lastName: "",
    primaryPhoneNumber: "+13 975 379 306",
    secondaryPhoneNumber: "",
    email: "",
    note: "nostrum",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "7133 Erdman Summit",
    secondAddressLine: "",
  },
  {
    id: "84264c8b-bbe7-4808-989a-a1dac55fbcf1",
    firstName: "Melyna",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "Melyna79@gmail.com",
    note: "similique dolorem enim",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "North Felixmouth",
  },
  {
    id: "9b74b1f0-624c-4fa2-b78d-40702b09ab17",
    firstName: "Milan",
    lastName: "Deckow",
    primaryPhoneNumber: "+34 114 483 502",
    secondaryPhoneNumber: "+51 491 738 581",
    email: "Milan_Deckow86@hotmail.com",
    note: "debitis deserunt ea et",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "03941 Alphonso Orchard",
    secondAddressLine: "Mullerfort",
  },
  {
    id: "99d5b104-d04c-46a0-9366-b14da9ec11a0",
    firstName: "",
    lastName: "Mosciski",
    primaryPhoneNumber: "+42 334 542 549",
    secondaryPhoneNumber: "",
    email: "",
    note: "autem cumque animi",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "56400 Jordan Oval",
    secondAddressLine: "East Marjory",
  },
  {
    id: "90eb6201-4252-4fa3-add3-b60e2b27c8dd",
    firstName: "Myrna",
    lastName: "",
    primaryPhoneNumber: "+72 383 361 402",
    secondaryPhoneNumber: "",
    email: "",
    note: "minima",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "38f2db89-6a3d-4d0b-90a9-818617d5d483",
    firstName: "",
    lastName: "Nienow",
    primaryPhoneNumber: "+49 196 779 932",
    secondaryPhoneNumber: "+53 239 222 662",
    email: "Luther_Nienow22@hotmail.com",
    note: "quasi molestiae velit",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "017 Bashirian Forges",
    secondAddressLine: "Maryseport",
  },
  {
    id: "a2b1a1e7-135a-4de1-9bc2-10772c63ffb0",
    firstName: "Oran",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+45 617 099 381",
    email: "Oran_Collins@gmail.com",
    note: "nisi est",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "Browntown",
  },
  {
    id: "27aa3e34-2d84-42d4-98f7-5dbe8ada2e87",
    firstName: "",
    lastName: "Orn",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+32 028 979 854",
    email: "",
    note: "quas",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "6e3810c8-c917-45d2-ae17-b83f73127e08",
    firstName: "Oswald",
    lastName: "Bednar",
    primaryPhoneNumber: "+62 761 294 266",
    secondaryPhoneNumber: "",
    email: "Oswald_Bednar1@hotmail.com",
    note: "cum aut voluptatem sunt",
    ice: false,
    favourite: true,
    blocked: false,
    firstAddressLine: "30177 Altenwerth Trace",
    secondAddressLine: "East Percivalberg",
  },
  {
    id: "e201b17f-3eda-4478-a5c1-226b516fd30b",
    firstName: "Romaine",
    lastName: "Parker",
    primaryPhoneNumber: "+56 011 422 875",
    secondaryPhoneNumber: "",
    email: "Romaine13@hotmail.com",
    note: "beatae dolores voluptatibus numquam",
    ice: false,
    favourite: false,
    blocked: false,
    speedDial: 4,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "7615f861-7e05-4948-acce-f0dae56a1cf4",
    firstName: "Ron",
    lastName: "",
    primaryPhoneNumber: "+63 668 204 254",
    secondaryPhoneNumber: "",
    email: "",
    note: "cum voluptas",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "Feestview",
  },
  {
    id: "432a5b94-0b1a-44df-b2a0-5ebab489046b",
    firstName: "",
    lastName: "Rosenbaum",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "Tyree.Rosenbaum@yahoo.com",
    note: "molestias in",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "Kiehntown",
  },
  {
    id: "990f38dd-1c84-4d23-a8bb-6fcfff42774b",
    firstName: "Sandra",
    lastName: "Zulauf",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+01 078 963 511",
    email: "Sandra44@gmail.com",
    note: "sequi sunt nisi",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "09136 Linda Spring",
    secondAddressLine: "",
  },
  {
    id: "54a8afb8-7521-4134-9025-078a5d1c208f",
    firstName: "",
    lastName: "Sanford",
    primaryPhoneNumber: "+47 399 093 634",
    secondaryPhoneNumber: "",
    email: "Scarlett35@yahoo.com",
    note: "quibusdam",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "81120 Alejandra Island",
    secondAddressLine: "Konopelskiview",
  },
  {
    id: "2977c08f-d3b6-49f1-93c5-1b65534185e5",
    firstName: "",
    lastName: "Schmidt",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "voluptate repellendus tempora",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "Blancaburgh",
  },
  {
    id: "1ad81b78-f30d-431f-ba9e-9af7d1e74240",
    firstName: "",
    lastName: "Sipes",
    primaryPhoneNumber: "+32 094 572 175",
    secondaryPhoneNumber: "",
    email: "",
    note: "dolores deleniti sunt doloremque",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "062 Anastasia Points",
    secondAddressLine: "South Raphael",
  },
  {
    id: "b704a4be-c5a8-469b-ac2a-4ff194049898",
    firstName: "Soledad",
    lastName: "West",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "Soledad_West@hotmail.com",
    note: "qui",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "461 O'Conner Trace",
    secondAddressLine: "",
  },
  {
    id: "29634f66-a4b7-4661-94d7-afce4eaff403",
    firstName: "",
    lastName: "Stokes",
    primaryPhoneNumber: "+42 139 089 182",
    secondaryPhoneNumber: "",
    email: "Johnny.Stokes@yahoo.com",
    note: "consequatur ea commodi fugit",
    ice: false,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "Toybury",
  },
  {
    id: "bb101ee3-03a4-4af1-b6c1-42f0ad0712ae",
    firstName: "Tatyana",
    lastName: "Cartwright",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+83 559 892 925",
    email: "Tatyana_Cartwright@hotmail.com",
    note: "voluptas aliquid aut",
    ice: false,
    favourite: true,
    blocked: false,
    firstAddressLine: "43478 Kiley Spurs",
    secondAddressLine: "",
  },
  {
    id: "0d9a947d-1e9c-4add-8805-80b805e784fc",
    firstName: "Theron",
    lastName: "Paucek",
    primaryPhoneNumber: "+91 898 402 777",
    secondaryPhoneNumber: "",
    email: "Theron_Paucek37@hotmail.com",
    note: "nesciunt tenetur praesentium",
    ice: true,
    favourite: true,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "Kochmouth",
  },
  {
    id: "194359ff-fd7e-4c07-8c19-0e7b2cfa62de",
    firstName: "Tyler",
    lastName: "Brown",
    primaryPhoneNumber: "+93 263 415 665",
    secondaryPhoneNumber: "+20 151 450 490",
    email: "Tyler28@yahoo.com",
    note: "non minima sed voluptatibus",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "83085 Stamm Lock",
    secondAddressLine: "North Merle",
  },
  {
    id: "8c2f6ec4-94a2-4a66-bf2d-c32409ab36e8",
    firstName: "",
    lastName: "Volkman",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "qui nesciunt",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "83765 Rigoberto Mount",
    secondAddressLine: "",
  },
  {
    id: "150565e7-5b23-4ac5-9e02-0e7b557d4a96",
    firstName: "",
    lastName: "Walter",
    primaryPhoneNumber: "+81 709 418 252",
    secondaryPhoneNumber: "+98 576 970 025",
    email: "",
    note: "beatae",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  {
    id: "522c20fd-7192-4801-8e09-ef380e48e4c2",
    firstName: "",
    lastName: "Weimann",
    primaryPhoneNumber: "+53 841 636 706",
    secondaryPhoneNumber: "",
    email: "",
    note: "magni sit dicta",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "568 Rohan Brook",
    secondAddressLine: "Carolynefort",
  },
  {
    id: "bc44c636-3d62-474e-aaaa-4ccca22f5ea9",
    firstName: "",
    lastName: "Willms",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "molestiae quod",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "19913 Nicholas Brook",
    secondAddressLine: "",
  },
  {
    id: "1ef4e97e-1bf9-43e2-856f-577bf27fab42",
    firstName: "Zakary",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+82 707 439 683",
    email: "",
    note: "fuga qui minus",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
]

export const phoneSeed: Phone = contactDatabaseFactory(phoneSeedInput)
