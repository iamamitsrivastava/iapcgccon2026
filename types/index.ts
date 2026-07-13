import { ReactNode } from 'react';

export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    submittedAt: string;
    forwardTo?: string;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface HighlightItem {
    text: string;
    icon?: ReactNode;
}

export interface GuidelineItem {
    title: string;
    text: string;
}

export interface CommitteeMember {
    name: string;
    role?: string;
    affiliation?: string;
    image?: string;
    details?: string;
}

export interface TimelineItem {
    label: string;
    date: string;
}

export interface RegistrationInput {
  fullName: string;
  gender: string;
  department: string;
  designation: string;
  participantCategory: string;
  institution: string;
  email: string;
  mobile: string;
  iapsmMember: string;
  iapsmRegNumber: string;
  foodPreference: string;
  registrationFor: string[];
  rrnNumber: string;
  dateOfPayment: string;
  // optional URLs for uploaded files (if you store them)
  passportPhoto?: string;
  paymentProof?: string;
  registrationPlan?: string;
}
