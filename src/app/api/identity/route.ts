import { NextResponse } from 'next/server';
import { identityData } from '@/lib/mockData';

export async function GET() {
  const allSkills = Object.values(identityData.skillsInventory).flat();
  return NextResponse.json({
    name: identityData.personal.name,
    headline: identityData.personal.headline,
    location: identityData.personal.location,
    email: identityData.personal.email,
    linkedin: identityData.personal.linkedin,
    youtube: identityData.personal.youtube,
    certificates: identityData.certificates,
    skillsInventory: allSkills,
    summary: identityData.summary,
    experience: identityData.experience,
    education: identityData.education,
    personal: identityData.personal,
  });
}

