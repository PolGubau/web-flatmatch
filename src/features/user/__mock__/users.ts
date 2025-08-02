import type { User } from "src/entities/user/user";

export const mockUser: User = {
  id: "user_9",
  name: "Lucía García",
  email: "lucia.garcia@gmail.com",
  phone: "+34678901234",
  avatarUrl: "/avatars/lucia.png",
  birthDate: "2000-04-12",
  gender: "female",
  occupation: "student",
  aboutMe: "Estudiante de medicina en la UB, tranquila, ordenada y no fumo.",
  languagesSpoken: ["es", "ca", "en"],
  createdAt: new Date("2024-11-20"),
  updatedAt: new Date(),
  isVerified: {
    email: true,
    phone: true,
    idCheck: false,
  },
  preferences: {
    gender: {
      male: true,
      female: true,
      other: false,
    },
    age: {
      min: 20,
      max: 30,
    },
    occupation: {
      student: true,
      employed: true,
      unemployed: false,
      other: false,
    },
    rentType: ["shared", "single"],
    maxBudget: 600,
    moveInDate: "2025-09-01",
    duration: {
      unit: "month",
      value: 10,
    },
  },
  savedRoomIds: ["room_1", "room_5"],
  listedRoomIds: ["room_10"],
  authProvider: "google",
  providerId: "google-oauth2|999999999999999",
};
