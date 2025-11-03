"use server";

import { Gender } from "@prisma/client";
import { prisma } from "../prisma";
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";

export async function getDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        _count: { select: { appointments: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return doctors.map((doctor) => ({
      ...doctor,
      appointmentCount: doctor._count.appointments,
    }));
  } catch (error) {
    console.log("Error fetchig doctors", error);
    throw new Error("Failed to fetch doctors");
  }
}

interface createDoctorInput {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: Gender;
  isActive: boolean;
}
export async function createDoctor(input: createDoctorInput) {
  try {
    if (!input.name || !input.email)
      throw new Error("Name and Email are required");

    const doctor = await prisma.doctor.create({
      data: {
        ...input,
        imageUrl: generateAvatar(input.name, input.gender),
      },
    });
    revalidatePath("/admin");
    return doctor;
  } catch (error: any) {
    console.log("Error creating doctor:", error);

    //handle unique constraing violation (email already exists)
    if (error?.code === "P2002") {
      throw new Error("A doctor with this email already exists");
    }

    throw new Error("Failed to create doctor");
  }
}

interface UpadatDoctorInput extends Partial<createDoctorInput> {
  id: string;
}

export async function updateDoctor(input: UpadatDoctorInput) {
  try {
    if (!input.name || !input.email)
      throw new Error("Name and email are required");

    const currentDoctor = await prisma.doctor.findUnique({
      where: { email: input.email },
      select: { email: true },
    });
    if (!currentDoctor) throw new Error("Doctor not found");

    //if email is changing check if the new email already exist
    if (input.email !== currentDoctor.email) {
      const existingDoctor = await prisma.doctor.findUnique({
        where: { email: input.email },
      });
      if (existingDoctor)
        throw new Error("A doctor with this email already exist");
    }

    const doctor = await prisma.doctor.update({
      where: { id: input.id },
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        speciality: input.speciality,
        gender: input.gender,
        isActive: input.isActive,
      },
    });
    return doctor;
  } catch (error) {
    console.log("Error updating doctor:", error);
    throw new Error("Failed to update doctor");
  }
}
