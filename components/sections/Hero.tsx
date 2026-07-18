'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, FileText, Award, Layers, Search, Globe, X, CheckCircle2, Clock, Lock, Copy, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { conference } from '@/data/conference';
import { REGISTRATION_MAPPING, ACCESS_CODE_MAPPING } from '@/lib/registrationData';
import styles from './Hero.module.css';

// Unique IAPSMGC access codes for Abstract submission
export const ABSTRACT_ACCESS_CODES = [
  'IAPSMGC2026', 'IAPSMGC-X7K4M2', 'IAPSMGC-P9R8T5', 'IAPSMGC-W3N6Q1', 'IAPSMGC-H8V2L7', 'IAPSMGC-Z4M9K3',
  'IAPSMGC-B7T5X8', 'IAPSMGC-R2Q6N4', 'IAPSMGC-K9W3P7', 'IAPSMGC-C5L8T2', 'IAPSMGC-Y1M7R6',
  'IAPSMGC-F4X9K8', 'IAPSMGC-N2P6W3', 'IAPSMGC-T8R1M5', 'IAPSMGC-Q7V4L9', 'IAPSMGC-D3K8X2',
  'IAPSMGC-M5T7Q4', 'IAPSMGC-V8P2N9', 'IAPSMGC-A6W3K7', 'IAPSMGC-L4R8X1', 'IAPSMGC-E9M2T6',
  'IAPSMGC-G7Q5P3', 'IAPSMGC-U2N8W4', 'IAPSMGC-J6X1R9', 'IAPSMGC-S4K7M2', 'IAPSMGC-B8V3T5',
  'IAPSMGC-Y2P9L4', 'IAPSMGC-H5N1Q7', 'IAPSMGC-C7R4X8', 'IAPSMGC-W9K2M6', 'IAPSMGC-F3T8P1',
  'IAPSMGC-N6Q4V7', 'IAPSMGC-R1X9L3', 'IAPSMGC-D8M5K2', 'IAPSMGC-T4W7P9', 'IAPSMGC-A2N6R8',
  'IAPSMGC-L9Q3X5', 'IAPSMGC-G4K8T1', 'IAPSMGC-U7P2M9', 'IAPSMGC-J1R6W4', 'IAPSMGC-S8X3Q2',
  'IAPSMGC-B5T9N7', 'IAPSMGC-Y4K1P6', 'IAPSMGC-H2M8R3', 'IAPSMGC-C9W5Q7', 'IAPSMGC-W1X4T8',
  'IAPSMGC-F7P3N2', 'IAPSMGC-N8R6K5', 'IAPSMGC-R4M1Q9', 'IAPSMGC-D2T7W3', 'IAPSMGC-T9P5X1',
  'IAPSMGC-A8K4N6', 'IAPSMGC-L1R7M2', 'IAPSMGC-G5Q9T4', 'IAPSMGC-U3W8P7', 'IAPSMGC-J2N4X9',
  'IAPSMGC-S7K5R1', 'IAPSMGC-B9M3Q8', 'IAPSMGC-Y6T2P4', 'IAPSMGC-H1W7N5', 'IAPSMGC-C4R9X2',
  'IAPSMGC-W8K6M1', 'IAPSMGC-F2Q7T9', 'IAPSMGC-N5P1R4', 'IAPSMGC-R8X2W6', 'IAPSMGC-D1M9K7',
  'IAPSMGC-T6Q3N8', 'IAPSMGC-A4P7R2', 'IAPSMGC-L8W1X5', 'IAPSMGC-G2K9M4', 'IAPSMGC-U5T8Q1',
  'IAPSMGC-J9R4N6', 'IAPSMGC-S3P2W8', 'IAPSMGC-B1X7K9', 'IAPSMGC-Y8M4T2', 'IAPSMGC-H6Q1R7',
  'IAPSMGC-C2N9P5', 'IAPSMGC-W4K3X8', 'IAPSMGC-F9T6M1', 'IAPSMGC-N1R8Q4', 'IAPSMGC-R7W2P9',
  'IAPSMGC-D5K4N3', 'IAPSMGC-T1M8X6', 'IAPSMGC-A9Q7R5', 'IAPSMGC-L3P4W2', 'IAPSMGC-G8N1K7',
  'IAPSMGC-U6X9T3', 'IAPSMGC-J4M2Q8', 'IAPSMGC-S1R5P7', 'IAPSMGC-B6W8N4', 'IAPSMGC-Y3K2X9',
  'IAPSMGC-H7T4M1', 'IAPSMGC-C1Q8R6', 'IAPSMGC-W5P9N2', 'IAPSMGC-F8X3K4', 'IAPSMGC-N4M7T5',
  'IAPSMGC-R2Q1W8', 'IAPSMGC-D9P6N3', 'IAPSMGC-T3K5X7', 'IAPSMGC-A7R8M1', 'IAPSMGC-L2W4Q9',
  'IAPSMGC-G9N5P2', 'IAPSMGC-U1X6K8', 'IAPSMGC-J7T3R4', 'IAPSMGC-S5M9Q1', 'IAPSMGC-B2P8W7',
  'IAPSMGC-Y9K6N4', 'IAPSMGC-H3X1T8', 'IAPSMGC-C8R7M5', 'IAPSMGC-W2Q4P1', 'IAPSMGC-F5N9K6',
  'IAPSMGC-N7X2R3', 'IAPSMGC-R3T8M4', 'IAPSMGC-D6W1Q9', 'IAPSMGC-T2P7K5', 'IAPSMGC-A1N4X8',
  'IAPSMGC-L7R2M9', 'IAPSMGC-G3Q6W5', 'IAPSMGC-U8T1P4', 'IAPSMGC-J5K9N2', 'IAPSMGC-S9X4R7',
  'IAPSMGC-B4M1Q6', 'IAPSMGC-Y7P3W8', 'IAPSMGC-H9K5T2', 'IAPSMGC-C3N8R1', 'IAPSMGC-W7X5M9',
  'IAPSMGC-F1Q2P8', 'IAPSMGC-N9T4K3', 'IAPSMGC-R5M7W1', 'IAPSMGC-D4X8Q2', 'IAPSMGC-T7P1N6',
  'IAPSMGC-A3R9K4', 'IAPSMGC-L5W6M8', 'IAPSMGC-G1Q3T7', 'IAPSMGC-U9N2P5', 'IAPSMGC-J8X7R1',
  'IAPSMGC-S2K4M9', 'IAPSMGC-B3T1Q8', 'IAPSMGC-Y5W9N7', 'IAPSMGC-H4P2X6', 'IAPSMGC-C6R3K1',
  'IAPSMGC-W9M8T5', 'IAPSMGC-F4Q1N7', 'IAPSMGC-N3P6R2', 'IAPSMGC-R9X5K8', 'IAPSMGC-D7M2W4',
  'IAPSMGC-T5Q8N1', 'IAPSMGC-A2P9R3', 'IAPSMGC-L6X4K7', 'IAPSMGC-G7M1T9', 'IAPSMGC-U4Q5W2',
  'IAPSMGC-J1N8P6', 'IAPSMGC-S6R2X4', 'IAPSMGC-B8K7M3', 'IAPSMGC-Y1T5Q9', 'IAPSMGC-H2W6N8',
  'IAPSMGC-C5P4R7', 'IAPSMGC-W3X9K1', 'IAPSMGC-F6M2T4', 'IAPSMGC-N2Q8P7', 'IAPSMGC-R1W5K6',
  'IAPSMGC-D8X7M9', 'IAPSMGC-T4N3Q2', 'IAPSMGC-A5P1R8', 'IAPSMGC-L9K2W7', 'IAPSMGC-G4T6M3',
  'IAPSMGC-U2X1N5', 'IAPSMGC-J3Q7P4', 'IAPSMGC-S7W8R9', 'IAPSMGC-B1M5K2', 'IAPSMGC-Y4T3N6',
  'IAPSMGC-H8Q9P1', 'IAPSMGC-C7X2R5', 'IAPSMGC-W6K1M4', 'IAPSMGC-F2N7T8', 'IAPSMGC-N8P5Q3',
  'IAPSMGC-R6W4X1', 'IAPSMGC-D3K9M7', 'IAPSMGC-T8R2N4', 'IAPSMGC-A1Q6P9', 'IAPSMGC-L4W3K8',
  'IAPSMGC-G6M7T2', 'IAPSMGC-U7P9X1', 'IAPSMGC-J2R4N8', 'IAPSMGC-S8K3Q5', 'IAPSMGC-B9W1M6',
  'IAPSMGC-Y2T7P3', 'IAPSMGC-H5X8R4', 'IAPSMGC-C1N6Q7',
  'IAPSMGC-Y1K4M9', 'IAPSMGC-D8P2T6', 'IAPSMGC-M7Q5L1', 'IAPSMGC-B2X9W4', 'IAPSMGC-U8R1K3', 'IAPSMGC-C6T4N9', 'IAPSMGC-G1P7Q2', 'IAPSMGC-L8W3M6', 'IAPSMGC-P5K9X1', 'IAPSMGC-R7N2T8',
  'IAPSMGC-X4Q6L5', 'IAPSMGC-V9M1P7', 'IAPSMGC-H3W8K2', 'IAPSMGC-Z2R5X6', 'IAPSMGC-E9L4N1', 'IAPSMGC-T7P3M8', 'IAPSMGC-A5Q1W9', 'IAPSMGC-F8K6R4', 'IAPSMGC-K3W8N5', 'IAPSMGC-P9R2X6',
  'IAPSMGC-Z4M7T1', 'IAPSMGC-V6Q1L8', 'IAPSMGC-E5K9P3', 'IAPSMGC-R8N4W2', 'IAPSMGC-X2T7M9', 'IAPSMGC-H1P6Q4', 'IAPSMGC-Q8L3R7', 'IAPSMGC-T5X9K2', 'IAPSMGC-A7M4N8', 'IAPSMGC-F1W6P5',
  'IAPSMGC-Y3Q8T9', 'IAPSMGC-D9L2X1', 'IAPSMGC-M4R7K6', 'IAPSMGC-B8P5W1', 'IAPSMGC-U6N9Q3', 'IAPSMGC-C2X4T7', 'IAPSMGC-G5M1L9', 'IAPSMGC-L7K3R8', 'IAPSMGC-P1Q6N4', 'IAPSMGC-R4T8W9',
  'IAPSMGC-X9M2P7', 'IAPSMGC-V3L5K1', 'IAPSMGC-H6R8Q2', 'IAPSMGC-Z1W4T5', 'IAPSMGC-E8P7M3', 'IAPSMGC-T3N1X9', 'IAPSMGC-A4Q6L7', 'IAPSMGC-F9K5R2', 'IAPSMGC-Y6T1W8', 'IAPSMGC-D2M9P4',
  'IAPSMGC-M8X3Q5', 'IAPSMGC-B7L1N6', 'IAPSMGC-U4R2K9', 'IAPSMGC-C5P8T3', 'IAPSMGC-G9W6M1', 'IAPSMGC-L2Q7X4', 'IAPSMGC-P8N5R9', 'IAPSMGC-R6K1L3', 'IAPSMGC-X5T2W7', 'IAPSMGC-V1M8Q6',
  'IAPSMGC-H7P9N2', 'IAPSMGC-Z3R4K5', 'IAPSMGC-E6X1T8', 'IAPSMGC-T8L9M4', 'IAPSMGC-A1W5Q7', 'IAPSMGC-F4N2P8', 'IAPSMGC-Y7K6R3', 'IAPSMGC-D5T8X9', 'IAPSMGC-M1Q4W6', 'IAPSMGC-B3P7L2',
  'IAPSMGC-U9R5N1', 'IAPSMGC-C8M6K4', 'IAPSMGC-G2X9T5', 'IAPSMGC-L6W1P3', 'IAPSMGC-P4Q8R2', 'IAPSMGC-R3N7M5', 'IAPSMGC-X7K4L9', 'IAPSMGC-V8T2Q1', 'IAPSMGC-H5M3W7', 'IAPSMGC-Z9P6X2',
  'IAPSMGC-E1R8N4', 'IAPSMGC-T6Q5K9', 'IAPSMGC-A9L7M3', 'IAPSMGC-F2W8R1', 'IAPSMGC-Y5P3T6', 'IAPSMGC-D7X4Q8', 'IAPSMGC-M6N2L5', 'IAPSMGC-B1K9W7', 'IAPSMGC-U3T5P2', 'IAPSMGC-C4R1X8',
  'IAPSMGC-G8Q7M6', 'IAPSMGC-L1P9N3', 'IAPSMGC-P2W4K8', 'IAPSMGC-R5M6T1', 'IAPSMGC-X3Q9L7', 'IAPSMGC-V7R1P4', 'IAPSMGC-H4N8W5', 'IAPSMGC-Z6T3K2', 'IAPSMGC-E3M5Q1', 'IAPSMGC-T1X7R9',
  'IAPSMGC-A2P6L4', 'IAPSMGC-F5Q3N8', 'IAPSMGC-Y8W2M1', 'IAPSMGC-D4K7T6', 'IAPSMGC-M9R1X5', 'IAPSMGC-B6L8Q3', 'IAPSMGC-U5P4W9', 'IAPSMGC-C3N1K7', 'IAPSMGC-G7T9R4', 'IAPSMGC-L9M5X2',
  'IAPSMGC-P6Q1W3', 'IAPSMGC-R2K8N7', 'IAPSMGC-X1L4T9', 'IAPSMGC-V5M7P6', 'IAPSMGC-H2Q9R1', 'IAPSMGC-Z8W5L4', 'IAPSMGC-E4T2N7', 'IAPSMGC-T9P1K3', 'IAPSMGC-A3X8M6', 'IAPSMGC-F6R4Q9',
  'IAPSMGC-Y2N7W5',
];

// Unique IAPSMGC access codes for Full Paper submission
export const FULL_PAPER_ACCESS_CODES = [
  'IAPSMGC-B1A1L8', 'IAPSMGC-T1B4U5', 'IAPSMGC-Q5K6Q9', 'IAPSMGC-Q6J8G1', 'IAPSMGC-B3B1T5', 'IAPSMGC-R2R1G4', 'IAPSMGC-Q1Y9M6', 'IAPSMGC-V5S7E4', 'IAPSMGC-G9H1L5', 'IAPSMGC-P2R4G3', 'IAPSMGC-Y3W1B5', 'IAPSMGC-S5K3G8', 'IAPSMGC-K2U6K6', 'IAPSMGC-R6X2M7', 'IAPSMGC-Q5C4J7', 'IAPSMGC-C8B3U8', 'IAPSMGC-R5G3E3', 'IAPSMGC-B6N2K5', 'IAPSMGC-M6D3M7', 'IAPSMGC-R9R8J4', 'IAPSMGC-V1K1G4', 'IAPSMGC-W4J2D5', 'IAPSMGC-Z2Z4R8', 'IAPSMGC-N7R4N7', 'IAPSMGC-B4C7C3', 'IAPSMGC-G2D1Q8', 'IAPSMGC-J9A8R5', 'IAPSMGC-X1R8E1', 'IAPSMGC-B8Q8R3', 'IAPSMGC-P8Q5K9', 'IAPSMGC-N1Z7D9', 'IAPSMGC-T6U4S8', 'IAPSMGC-L1J3W7', 'IAPSMGC-R3E9G5', 'IAPSMGC-J7L9C9', 'IAPSMGC-L5P5B3', 'IAPSMGC-W4T1Q5', 'IAPSMGC-Z6P1Y1', 'IAPSMGC-P2U7B1', 'IAPSMGC-M7X6Z5', 'IAPSMGC-T5X9Z9', 'IAPSMGC-Y8P9L1', 'IAPSMGC-X2T5D5', 'IAPSMGC-H4G3B8', 'IAPSMGC-N5Y2V5', 'IAPSMGC-Z6U9B7', 'IAPSMGC-U9P2B2', 'IAPSMGC-F8M9L2', 'IAPSMGC-N5U4X8', 'IAPSMGC-Y7Q8T9', 'IAPSMGC-E5R7J6', 'IAPSMGC-Q4C7P6', 'IAPSMGC-K5L5B9', 'IAPSMGC-B1J2B8', 'IAPSMGC-K6N4V6', 'IAPSMGC-Y6A6G9', 'IAPSMGC-L9R9U2', 'IAPSMGC-P8U9W3', 'IAPSMGC-K8Z5C1', 'IAPSMGC-V5C2Q1', 'IAPSMGC-R4X9B5', 'IAPSMGC-V2M4T2', 'IAPSMGC-U5E5K6', 'IAPSMGC-D8U8R1', 'IAPSMGC-P5Q6N8', 'IAPSMGC-C9P1P1', 'IAPSMGC-E6K5Q3', 'IAPSMGC-L2S8F2', 'IAPSMGC-A3W3K5', 'IAPSMGC-M8R7A3', 'IAPSMGC-B1K5A3', 'IAPSMGC-V9X6C1', 'IAPSMGC-W9E6B2', 'IAPSMGC-H9V2C9', 'IAPSMGC-W2G2N2', 'IAPSMGC-F6C1L7', 'IAPSMGC-H7C4U5', 'IAPSMGC-C2M4L7', 'IAPSMGC-C2H2F5', 'IAPSMGC-R3N8J7', 'IAPSMGC-B9F8E7', 'IAPSMGC-T7F8C1', 'IAPSMGC-E9G3L6', 'IAPSMGC-M4V5J2', 'IAPSMGC-U3H9M3', 'IAPSMGC-G2E3G6', 'IAPSMGC-F7A1T8', 'IAPSMGC-W2M8V3', 'IAPSMGC-Q5E3D5', 'IAPSMGC-F8Y8W4', 'IAPSMGC-G5X6W1', 'IAPSMGC-C2C4M4', 'IAPSMGC-W4Y8S8', 'IAPSMGC-H6Y7V3', 'IAPSMGC-Z5P8Q4', 'IAPSMGC-P2G5L1', 'IAPSMGC-V3M1U7', 'IAPSMGC-T1A5K4', 'IAPSMGC-Y2B3E6', 'IAPSMGC-Y2B6J6', 'IAPSMGC-M6H5V1', 'IAPSMGC-A3E2K2', 'IAPSMGC-H2C2W6', 'IAPSMGC-G3B9X2', 'IAPSMGC-S6G1C5', 'IAPSMGC-P1W1Q3', 'IAPSMGC-U7P9C8', 'IAPSMGC-F5P2N6', 'IAPSMGC-A2Y9D7', 'IAPSMGC-X2B2G9', 'IAPSMGC-A3X6W1', 'IAPSMGC-U1Y6U7', 'IAPSMGC-R5B6C9', 'IAPSMGC-W5K8G3', 'IAPSMGC-H4V5E7', 'IAPSMGC-F9J6U8', 'IAPSMGC-H9P9J1', 'IAPSMGC-H5B5W1', 'IAPSMGC-R8M6C2', 'IAPSMGC-K5Q9V7', 'IAPSMGC-M2Q2Y9', 'IAPSMGC-C9E5C4', 'IAPSMGC-G5J8G1', 'IAPSMGC-D6C1M9', 'IAPSMGC-F6Z6A5', 'IAPSMGC-A4N6J4', 'IAPSMGC-J6H8C9', 'IAPSMGC-M3B7E5', 'IAPSMGC-H3R8V1', 'IAPSMGC-R9P3B2', 'IAPSMGC-K4F9P3', 'IAPSMGC-E2G4K7', 'IAPSMGC-Q5H4K2', 'IAPSMGC-S1L2H6', 'IAPSMGC-Y3D4K9', 'IAPSMGC-S7A7R7', 'IAPSMGC-X6R9D3', 'IAPSMGC-U9B3B4', 'IAPSMGC-K2R9Q4', 'IAPSMGC-P5J8Z5', 'IAPSMGC-J3F5Y6', 'IAPSMGC-W2Q5U8', 'IAPSMGC-N6Z7Q7', 'IAPSMGC-A4W1D5', 'IAPSMGC-Q1S5S4', 'IAPSMGC-S9D4G9', 'IAPSMGC-F1G6X7', 'IAPSMGC-K6C4E3', 'IAPSMGC-V1P4K3', 'IAPSMGC-M1G6L6', 'IAPSMGC-S4B5W1', 'IAPSMGC-L7V2S5', 'IAPSMGC-V8V1V7', 'IAPSMGC-R4N7T3', 'IAPSMGC-K6S4W4', 'IAPSMGC-H8C1X7', 'IAPSMGC-F9X4Z6', 'IAPSMGC-L6S8H4', 'IAPSMGC-R9G1F3', 'IAPSMGC-G2Q7S7', 'IAPSMGC-Z8C3R2', 'IAPSMGC-J4J6L1', 'IAPSMGC-D2D8R9', 'IAPSMGC-T2U3E1', 'IAPSMGC-N4Q2P8', 'IAPSMGC-T1V5Z3', 'IAPSMGC-J4Q1D4', 'IAPSMGC-Y7A3X6', 'IAPSMGC-E1E7F6', 'IAPSMGC-M5C2W8', 'IAPSMGC-U6U2G8', 'IAPSMGC-Q4H6C2', 'IAPSMGC-Z4A9Z4', 'IAPSMGC-A3Y8V9', 'IAPSMGC-Y4D2A6', 'IAPSMGC-V6Q4Q1', 'IAPSMGC-B7P4L3', 'IAPSMGC-S1Y3K1', 'IAPSMGC-Z3M4X4', 'IAPSMGC-S7A6A6', 'IAPSMGC-C6E2H8', 'IAPSMGC-P6Y9E7', 'IAPSMGC-R4L3Y4', 'IAPSMGC-N8W9Z8', 'IAPSMGC-N5G9E7', 'IAPSMGC-D5R6U8', 'IAPSMGC-G7Y3S8', 'IAPSMGC-V5H9C8', 'IAPSMGC-V5Q8C3', 'IAPSMGC-X4F8B1', 'IAPSMGC-H3R9L3', 'IAPSMGC-J5J4F3', 'IAPSMGC-Q5S4G7', 'IAPSMGC-A4X6M1', 'IAPSMGC-C5Y3Y2', 'IAPSMGC-V4G1J2', 'IAPSMGC-X9S3T7', 'IAPSMGC-K8H2M2', 'IAPSMGC-A1T1V2', 'IAPSMGC-L4F6E3', 'IAPSMGC-W4R6A3', 'IAPSMGC-X4R3Q2', 'IAPSMGC-V5X7G4', 'IAPSMGC-Z7F9D9', 'IAPSMGC-G1X8T1', 'IAPSMGC-T6K4Q1', 'IAPSMGC-D1G2D2', 'IAPSMGC-R2J4A1', 'IAPSMGC-G8N8B8', 'IAPSMGC-J9M9J7', 'IAPSMGC-L6K7C5', 'IAPSMGC-J8C3T3', 'IAPSMGC-C1H3J1', 'IAPSMGC-W9W2Y6', 'IAPSMGC-J1S3G3', 'IAPSMGC-Y1H4J3', 'IAPSMGC-B5N8J5', 'IAPSMGC-V2N7L3', 'IAPSMGC-R9P2F8', 'IAPSMGC-D9N5A5', 'IAPSMGC-P5A1L4', 'IAPSMGC-V6M7U3', 'IAPSMGC-L9D8Z9', 'IAPSMGC-V3E1S6', 'IAPSMGC-Q6A9X6', 'IAPSMGC-X3P3U4', 'IAPSMGC-D4S7A8', 'IAPSMGC-V9K2D4', 'IAPSMGC-M4G1A1', 'IAPSMGC-M3X1J3', 'IAPSMGC-A7V2J9', 'IAPSMGC-R3E3M1', 'IAPSMGC-D4E3T5', 'IAPSMGC-N5K3A6', 'IAPSMGC-H8M2X3', 'IAPSMGC-W5H3A9', 'IAPSMGC-U6T1T1', 'IAPSMGC-T8B4V9', 'IAPSMGC-C6V7Q7', 'IAPSMGC-Z3D9T5', 'IAPSMGC-L9L5R6', 'IAPSMGC-C1S2E9', 'IAPSMGC-D9D3J8', 'IAPSMGC-S8V1S9', 'IAPSMGC-N6L7M4', 'IAPSMGC-R4U6U5', 'IAPSMGC-B8P7M9', 'IAPSMGC-C2C4R7', 'IAPSMGC-P3B6C9', 'IAPSMGC-G2Z7T7', 'IAPSMGC-L3D5K4', 'IAPSMGC-E4R9W2', 'IAPSMGC-R1S9N4', 'IAPSMGC-C4N2A5', 'IAPSMGC-E8Z1X7', 'IAPSMGC-Y6E4Q6', 'IAPSMGC-V2N7Q2', 'IAPSMGC-P9L4H9', 'IAPSMGC-C1K2Q1', 'IAPSMGC-S4A6F7', 'IAPSMGC-A2C1J3', 'IAPSMGC-J3H7A6', 'IAPSMGC-V1P5Q4', 'IAPSMGC-D8V2G9', 'IAPSMGC-P4A5W1', 'IAPSMGC-W2Y4Q3', 'IAPSMGC-R1L3G6', 'IAPSMGC-E6X2Y5', 'IAPSMGC-T3P1K4', 'IAPSMGC-F6A8G3', 'IAPSMGC-D9H6H3', 'IAPSMGC-B5Z5E7', 'IAPSMGC-V7A7H8', 'IAPSMGC-Z1V1Z4', 'IAPSMGC-J6V8H3', 'IAPSMGC-E1V7C1', 'IAPSMGC-G5D5Z5', 'IAPSMGC-V1P4H6', 'IAPSMGC-E5X2G7', 'IAPSMGC-Y3C2G3', 'IAPSMGC-R8A8V9', 'IAPSMGC-V3L3K9', 'IAPSMGC-A9P5X8', 'IAPSMGC-H2Y8F1', 'IAPSMGC-C2Z6N1', 'IAPSMGC-L5V5G3', 'IAPSMGC-S1U7H4', 'IAPSMGC-M5D1S4', 'IAPSMGC-L5E5M5', 'IAPSMGC-V6D7M1', 'IAPSMGC-X7D1K1', 'IAPSMGC-K4T5U3', 'IAPSMGC-K9N5L3', 'IAPSMGC-F8D1C3', 'IAPSMGC-C4H8D7', 'IAPSMGC-E6Q4Z7', 'IAPSMGC-T9Q5P7', 'IAPSMGC-H2V6K3', 'IAPSMGC-X3V8X1', 'IAPSMGC-J6W9C4', 'IAPSMGC-F3N6T2', 'IAPSMGC-Z1K4J7', 'IAPSMGC-U4R5Z3', 'IAPSMGC-F9V8A7', 'IAPSMGC-X9E7P8', 'IAPSMGC-P9K4P3', 'IAPSMGC-C8F6E2', 'IAPSMGC-E8M2F3', 'IAPSMGC-C7J2B2', 'IAPSMGC-B9K7M9', 'IAPSMGC-K4V5F8', 'IAPSMGC-X3B8U5', 'IAPSMGC-S8Y1Y7', 'IAPSMGC-P5J7Z8', 'IAPSMGC-V1K2W4', 'IAPSMGC-X2K2F1', 'IAPSMGC-L3J5Q4', 'IAPSMGC-B4L6T1', 'IAPSMGC-Q3J2Y8', 'IAPSMGC-J2T5Y4', 'IAPSMGC-S8P7H8', 'IAPSMGC-R7V2G4', 'IAPSMGC-H1D3Y4', 'IAPSMGC-K9Y7G9', 'IAPSMGC-Q2Q9J5', 'IAPSMGC-D8G9Y7', 'IAPSMGC-V3D4T9', 'IAPSMGC-E4F6L5', 'IAPSMGC-P6F9Q2', 'IAPSMGC-F5X3E2', 'IAPSMGC-W5B8F3', 'IAPSMGC-M4B8S8', 'IAPSMGC-A4D1F6', 'IAPSMGC-W4L2K8', 'IAPSMGC-S7B8Z6', 'IAPSMGC-E8Y9Y2', 'IAPSMGC-F7T7Z5', 'IAPSMGC-F8H4A3', 'IAPSMGC-M5F5E5', 'IAPSMGC-N9T5W6', 'IAPSMGC-K2S8X7', 'IAPSMGC-G4J9T2', 'IAPSMGC-D7G8P5', 'IAPSMGC-H1R7P1', 'IAPSMGC-T7D5M6', 'IAPSMGC-A1J1P7', 'IAPSMGC-K2E4N1', 'IAPSMGC-K3Z7D6', 'IAPSMGC-Q1Z2J3', 'IAPSMGC-X9J7Q3', 'IAPSMGC-G7B2H9', 'IAPSMGC-K3S2A4', 'IAPSMGC-S1G6K7', 'IAPSMGC-F5X9G4', 'IAPSMGC-Z2P5S5', 'IAPSMGC-D6V5U2', 'IAPSMGC-P7H2E8', 'IAPSMGC-N5Y6W8', 'IAPSMGC-G3G5J8', 'IAPSMGC-Y6M7H5', 'IAPSMGC-M6H3P1', 'IAPSMGC-M8Z3A5', 'IAPSMGC-H6L2A8', 'IAPSMGC-K7T9D3', 'IAPSMGC-N5D9R9', 'IAPSMGC-W2Q6N2', 'IAPSMGC-U2B4C3', 'IAPSMGC-K8J3K6', 'IAPSMGC-Y6T8A4', 'IAPSMGC-C4S6C7', 'IAPSMGC-T3Z7D7', 'IAPSMGC-T4Y7V6', 'IAPSMGC-Y9E1Q7', 'IAPSMGC-M4V1H2', 'IAPSMGC-Y6D6Z6', 'IAPSMGC-Q2J2C3', 'IAPSMGC-L3K5S1', 'IAPSMGC-V2Y2Y4', 'IAPSMGC-G5E7X1', 'IAPSMGC-M9C2C1', 'IAPSMGC-A9M9B5', 'IAPSMGC-R6D8Z3', 'IAPSMGC-C1U1C7', 'IAPSMGC-D9D4H7', 'IAPSMGC-N3V9T8', 'IAPSMGC-H1T7E9', 'IAPSMGC-K2M1S2', 'IAPSMGC-J8Y3X6', 'IAPSMGC-L3C4L6', 'IAPSMGC-Z2T7D4', 'IAPSMGC-J5Q4V9', 'IAPSMGC-D7Q3W9', 'IAPSMGC-E6V8M7', 'IAPSMGC-F3M9V7', 'IAPSMGC-U8P6X6', 'IAPSMGC-W6K9H5', 'IAPSMGC-J4D1Z4', 'IAPSMGC-V8K1D6', 'IAPSMGC-K4B9Y3', 'IAPSMGC-T8W2A3', 'IAPSMGC-L5Y8U4', 'IAPSMGC-B5K5J5', 'IAPSMGC-R5L1K4', 'IAPSMGC-R6H1V2', 'IAPSMGC-L7B4X6', 'IAPSMGC-R5M2J6', 'IAPSMGC-G4H3V7', 'IAPSMGC-F9E5F5', 'IAPSMGC-L5M5X7', 'IAPSMGC-D5M3R2', 'IAPSMGC-S6R8B2', 'IAPSMGC-M9K7L5', 'IAPSMGC-T9Y9L1', 'IAPSMGC-J3Y4M8', 'IAPSMGC-T4E4J5', 'IAPSMGC-F8N4Y6', 'IAPSMGC-A7N7D3', 'IAPSMGC-F1Y8A6', 'IAPSMGC-S3Z8Z1', 'IAPSMGC-G1D5G2', 'IAPSMGC-X5X7G2', 'IAPSMGC-K5P7A3', 'IAPSMGC-H1N1D3', 'IAPSMGC-M5Y9W5', 'IAPSMGC-U3P3T2', 'IAPSMGC-S4A7U1', 'IAPSMGC-Y4F5E2', 'IAPSMGC-A4H6W9', 'IAPSMGC-E4L2C5', 'IAPSMGC-R2W6Y6', 'IAPSMGC-T7U1G9', 'IAPSMGC-Z1U1J8', 'IAPSMGC-J5X2B9', 'IAPSMGC-Y5W2M7', 'IAPSMGC-Z7M9M6', 'IAPSMGC-A2X2G4', 'IAPSMGC-E1C9E7', 'IAPSMGC-K5T9K5', 'IAPSMGC-G3W5N4', 'IAPSMGC-P5K7Z2', 'IAPSMGC-L3V7L3', 'IAPSMGC-F1N3Z3', 'IAPSMGC-T6W9J3', 'IAPSMGC-L6F1T9', 'IAPSMGC-N5H3R1', 'IAPSMGC-S1M6T5', 'IAPSMGC-D3U8R4', 'IAPSMGC-F9C8S3', 'IAPSMGC-N7P8U6', 'IAPSMGC-J9W5Q6', 'IAPSMGC-J9U4E1', 'IAPSMGC-S3H9J2', 'IAPSMGC-Y5R4H7', 'IAPSMGC-P3T1V9', 'IAPSMGC-A6Z7X9', 'IAPSMGC-U9P7E1', 'IAPSMGC-J6E9U2', 'IAPSMGC-R1A4P8', 'IAPSMGC-X9N8K5', 'IAPSMGC-D8H2L9', 'IAPSMGC-Z5P5Y6', 'IAPSMGC-Z2M6H7', 'IAPSMGC-J2S5C3', 'IAPSMGC-S6S3B4', 'IAPSMGC-M4L7N5', 'IAPSMGC-B5G8C2', 'IAPSMGC-P6C8K7', 'IAPSMGC-Q5E2F5', 'IAPSMGC-G6S5C8', 'IAPSMGC-H5W3V5', 'IAPSMGC-E5Y9E5', 'IAPSMGC-S3Y6K1', 'IAPSMGC-R3M2P1', 'IAPSMGC-Y7G6H3', 'IAPSMGC-K9H8Z5', 'IAPSMGC-A8W1T2', 'IAPSMGC-M4L1X5', 'IAPSMGC-P5J4K5', 'IAPSMGC-R5P4G4', 'IAPSMGC-Z9F1R5', 'IAPSMGC-U2Z5R6', 'IAPSMGC-R2M1R9', 'IAPSMGC-X6P7M9', 'IAPSMGC-G5Q8T9', 'IAPSMGC-M1R1L7', 'IAPSMGC-Z9C1S4', 'IAPSMGC-N8K6A6', 'IAPSMGC-V1D8D9', 'IAPSMGC-G4X4G8', 'IAPSMGC-J8Y3K2', 'IAPSMGC-A4B7R6', 'IAPSMGC-X8W9N3', 'IAPSMGC-Q5H4A9', 'IAPSMGC-E5F6W1', 'IAPSMGC-P7V6C9', 'IAPSMGC-S3J6P3', 'IAPSMGC-W5H6Y2', 'IAPSMGC-R5Z3S9', 'IAPSMGC-K4V9T6', 'IAPSMGC-L5B3H3'
];



export default function Hero() {
  const profiles = [
    {
      name: "Shri Ram Madhav",
      title: "President, India Foundation",
      badge: "National Advisory Committee",
      image: "/images/ram-madhav-new.jpg"
    },
    {
      name: "Prof. Yogesh Singh",
      title: "AICTE Chairman & VC, Delhi University",
      badge: "National Advisory Committee",
      image: "/images/yogesh-singh.jpg"
    },
    {
      name: "Dr. Jigar Inamdar",
      title: "Chairman, Ramanujan College, DU",
      badge: "National Advisory Committee",
      image: "/images/jigar-inamdar.png"
    },
    {
      name: "Dr. Krishna Kant Dave",
      title: "Vice Chancellor, Bahra University",
      badge: "National Advisory Committee",
      image: "/images/krishna-kant-dave.jpg"
    },
    {
      name: "Dr. Rajan Welukar",
      title: "Vice Chancellor, ATLAS SkillTech University",
      badge: "National Advisory Committee",
      image: "/images/rajan-welukar.jpg"
    }
  ];

  const sliderImages = [
    "/images/iapsm-audience-1.jpg",
    "/images/iapsm-audience-2.jpg",
    "/images/iapsm-audience-3.jpg",
    "/images/iapsm-audience-4.jpg"
  ];

  const [currentProfile, setCurrentProfile] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [accessEmail, setAccessEmail] = useState('');
  const [foundAccessCodes, setFoundAccessCodes] = useState<string[]>([]);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [sendCodeSuccess, setSendCodeSuccess] = useState('');
  const [sendCodeError, setSendCodeError] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionType, setSubmissionType] = useState<'FULL_PAPER' | 'ABSTRACT'>('FULL_PAPER');
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [regEmail, setRegEmail] = useState('');
  const [foundRegNumbers, setFoundRegNumbers] = useState<string[]>([]);
  const [regError, setRegError] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    registrationNumber: '',
    email: '',
    documentLink: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const targetDate = new Date('2026-11-27T09:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setIsExpired(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const countdownInterval = setInterval(updateTimer, 1000);

    const profileInterval = setInterval(() => {
      setCurrentProfile((prev) => (prev + 1) % profiles.length);
    }, 5000);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4500);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(profileInterval);
      clearInterval(slideInterval);
    };
  }, [profiles.length]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { name: fullName, registrationNumber, email, documentLink } = formData;

      const submitData = new FormData();
      submitData.append('submissionType', submissionType); // 'FULL_PAPER' or 'ABSTRACT'
      submitData.append('fullName', fullName);
      submitData.append('registrationNo', registrationNumber);
      submitData.append('email', email);
      
      if (selectedFile) {
        submitData.append('file', selectedFile);
      }
      if (documentLink) {
        submitData.append('documentLink', documentLink);
      }

      const res = await fetch("/api/submit-abstract", {
          method: "POST",
          body: submitData,
      });

      if (res.ok) {
        setSubmissionSuccess(true);

        setTimeout(() => {
          setIsModalOpen(false);
          setSubmissionSuccess(false);
          setFormData({ name: "", registrationNumber: "", email: "", documentLink: "" });
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }, 2000);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Server error");
      }

    } catch (error: any) {
      console.error("Submission error:", error);
      alert(`Submission failed ❌: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetAccessCode = async () => {
    // Reject empty values, only accept valid email addresses
    if (!accessEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accessEmail.trim())) {
      setSendCodeError('❌ Please enter a valid email address.');
      setFoundAccessCodes([]);
      return;
    }

    const emailKey = accessEmail.trim().toLowerCase();
    const codes = ACCESS_CODE_MAPPING[emailKey];

    if (codes) {
      setFoundAccessCodes(codes);
      setSendCodeError('');
    } else {
      setFoundAccessCodes([]);
      setSendCodeError('❌ Access code not found for this email.');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setFormData(prev => ({ ...prev, documentLink: '' }));
    setUploadError('');
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.background}>
        <Image
          src="/images/gate-hero-new.jpg"
          alt="Hero Background"
          fill
          priority
          className={styles.backgroundImage}
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.content}>
            <div className={`${styles.presenter} ${styles.animate} ${styles['delay-100']}`} style={{ borderBottom: 'none', marginBottom: '0.25rem', display: 'block' }}>DEPARTMENT OF COMMUNITY MEDICINE</div>
            <div className={`${styles.presenter} ${styles.animate} ${styles['delay-100']}`}>PARUL INSTITUTE OF MEDICAL SCIENCES &amp; RESEARCH PRESENTS</div>

            <h1 className={`${styles.title} ${styles.animate} ${styles['delay-200']}`}>
              {conference.title}
            </h1>

            <p className={`${styles.subtitle} ${styles.animate} ${styles['delay-300']}`}>
              Digital Health for All: Bridging Equity, Access and Innovation
            </p>

            <div className={`${styles.meta} ${styles.animate} ${styles['delay-400']}`}>
              <div className={styles.metaItem}>
                <Calendar className={styles.metaIcon} size={24} />
                <span>
                  <strong>Pre-Conference: </strong>26 Nov 2026 &nbsp;|&nbsp;
                  <strong>Conference: </strong>27–28 Nov 2026
                </span>
              </div>
              <div className={styles.metaItem}>
                <MapPin className={styles.metaIcon} size={24} />
                <span>PIMSR, Parul University, Vadodara</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem', width: 'fit-content' }} className={`${styles.animate} ${styles['delay-500']}`}>
              <div className={styles.actions} style={{ marginBottom: 0 }}>
                {(!isMounted || !isExpired) && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSubmissionType('ABSTRACT');
                      setIsCodeVerified(false);
                      setIsModalOpen(true);
                    }}
                    className={styles.btnSecondary}
                    style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', padding: '0.6rem 1.5rem', cursor: 'pointer', outline: 'none' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', lineHeight: 1 }}>
                      Submit Abstract <Lock size={18} />
                    </div>
                  </button>
                )}

                <button onClick={() => { setSubmissionType('FULL_PAPER'); setIsCodeVerified(false); setIsModalOpen(true); }} className={styles.btnPrimary} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none' }}>
                  Submit Full Paper <Lock size={18} />
                </button>
              </div>

              <div className={styles.actions} style={{ marginBottom: 0 }}>
                <button
                  type="button"
                  onClick={() => setIsRegModalOpen(true)}
                  className={styles.btnSecondary}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.8rem 1.5rem',
                    cursor: 'pointer',
                    background: 'rgba(15, 23, 42, 0.4)',
                    color: '#ffbf00',
                    border: '2px solid #ffbf00',
                    boxShadow: 'none',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    letterSpacing: '0.1em'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 191, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(15, 23, 42, 0.4)';
                  }}
                >
                  KNOW YOUR REGISTRATION NUMBER
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className={`${styles.trustBar} ${styles.animate} ${styles['delay-600']}`}>
              <div className={styles.trustItem}>
                <Globe className={styles.trustIcon} size={20} />
                <span>International Conference</span>
              </div>
              <div className={styles.trustItem}>
                <Search className={styles.trustIcon} size={20} />
                <span>Indexed in Scopus / WoS</span>
              </div>
            </div>

          </div>


        </div>

        {/* Timer Row */}
        {isMounted && !isExpired && (
          <div className={`${styles.statsRow} ${styles.animate} ${styles['delay-700']}`}>
            <div className={styles.statItem} style={{ justifyContent: 'center' }}>
              <Clock size={42} color="var(--color-secondary)" strokeWidth={1.5} style={{ marginBottom: '0.5rem' }} />
              <span className={styles.statLabel}>Countdown</span>
            </div>
            <div className={styles.statLine}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{String(timeLeft.days).padStart(2, '0')}</span>
              <span className={styles.statLabel}>Days</span>
            </div>
            <div className={styles.statLine}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className={styles.statLabel}>Hours</span>
            </div>
            <div className={styles.statLine}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className={styles.statLabel}>Minutes</span>
            </div>
          </div>
        )}
      </div>

      {/* Submission Modal */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => { setIsModalOpen(false); setIsCodeVerified(false); setAccessCode(''); setCodeError(''); setSubmissionSuccess(false); setIsCodeSent(false); setSendCodeSuccess(''); setSendCodeError(''); }}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => { setIsModalOpen(false); setIsCodeVerified(false); setAccessCode(''); setCodeError(''); setSubmissionSuccess(false); setIsCodeSent(false); setSendCodeSuccess(''); setSendCodeError(''); }}
            >
              <X size={24} />
            </button>

            {submissionSuccess ? (
              <div className={styles.successState}>
                <div className={styles.successIconWrapper}>
                  <CheckCircle2
                    size={64}
                    className={styles.successCheck}
                  />
                </div>
                <h2 className={styles.successTitle}>Success!</h2>
                <p className={styles.successSubtitle}>
                  Your document has been successfully submitted.
                </p>
              </div>
            ) : !isCodeVerified ? (
              <>
                <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <h2 className={styles.modalTitle}>Get Your Access Code</h2>
                  <div className={styles.formGroup}>
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      value={accessEmail}
                      onChange={(e) => {
                        setAccessEmail(e.target.value);
                        setSendCodeError('');
                        setSendCodeSuccess('');
                        setIsCodeSent(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleGetAccessCode();
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(15, 23, 42, 0.6)',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      disabled={isSendingCode}
                    />
                    <button
                      type="button"
                      className={styles.submitModalBtn}
                      style={{ marginTop: '1rem' }}
                      onClick={handleGetAccessCode}
                    >
                      Get Code
                    </button>
                    {sendCodeError && (
                      <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.75rem', fontWeight: 500, whiteSpace: 'pre-line' }}>
                        {sendCodeError}
                      </p>
                    )}

                    {foundAccessCodes.length > 0 && (
                      <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px' }}>
                        <h3 style={{ color: '#10b981', margin: '0 0 0.75rem 0', fontSize: '1.05rem', fontWeight: 600 }}>
                          Your Access Code{foundAccessCodes.length > 1 ? 's' : ''}:
                        </h3>
                        <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {foundAccessCodes.map((code) => (
                            <li key={code} style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              background: 'rgba(15, 23, 42, 0.4)',
                              padding: '0.5rem 1rem',
                              borderRadius: '6px'
                            }}>
                              <span style={{ fontWeight: 'bold', letterSpacing: '1px', color: '#f8fafc' }}>
                                {code}
                              </span>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(code);
                                  setCopiedCode(code);
                                  setTimeout(() => setCopiedCode(null), 2000);
                                }}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: copiedCode === code ? '#10b981' : '#94a3b8',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  padding: '0.25rem',
                                  transition: 'color 0.2s',
                                  outline: 'none'
                                }}
                                title="Copy code"
                              >
                                {copiedCode === code ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <h2 className={styles.modalTitle}>Enter Access Code</h2>
                <p className={styles.modalSubtitle}>
                  Please enter your provided submission code to access the {submissionType === 'FULL_PAPER' ? 'paper' : 'abstract'} submission form.<br /><br />
                  <span style={{ color: '#ffbf00', fontWeight: 'bold' }}>Note: Each access code can be used up to 5 times.</span>
                </p>
                <div className={styles.formGroup} style={{ marginBottom: '1.5rem' }}>
                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value);
                      setCodeError('');
                    }}
                    placeholder="Enter Access Code"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(15, 23, 42, 0.6)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const code = accessCode.trim().toUpperCase();
                        const validCodes = submissionType === 'FULL_PAPER' ? FULL_PAPER_ACCESS_CODES : ABSTRACT_ACCESS_CODES;
                        if (validCodes.includes(code)) {
                          const usedCodes: string[] = JSON.parse(localStorage.getItem('used_access_codes') || '[]');
                          const usageCount = usedCodes.filter((c: string) => c === code).length;
                          if (usageCount >= 5 && code !== 'IAPSMGC2026') {
                            setCodeError('This code has reached its maximum usage limit of 5 times.');
                          } else {
                            // Burn the code immediately upon verification, except for the master code
                            if (code !== 'IAPSMGC2026') {
                              usedCodes.push(code);
                              localStorage.setItem('used_access_codes', JSON.stringify(usedCodes));
                            }
                            setIsCodeVerified(true);
                          }
                        } else {
                          setCodeError('Invalid access code. Please try again.');
                        }
                      }
                    }}
                  />
                  {codeError && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 500 }}>{codeError}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const code = accessCode.trim().toUpperCase();
                    const validCodes = submissionType === 'FULL_PAPER' ? FULL_PAPER_ACCESS_CODES : ABSTRACT_ACCESS_CODES;
                    if (validCodes.includes(code)) {
                      const usedCodes: string[] = JSON.parse(localStorage.getItem('used_access_codes') || '[]');
                      const usageCount = usedCodes.filter((c: string) => c === code).length;
                      if (usageCount >= 5 && code !== 'IAPSMGC2026') {
                        setCodeError('This code has reached its maximum usage limit of 5 times.');
                      } else {
                        // Burn the code immediately upon verification, except for the master code
                        if (code !== 'IAPSMGC2026') {
                          usedCodes.push(code);
                          localStorage.setItem('used_access_codes', JSON.stringify(usedCodes));
                        }
                        setIsCodeVerified(true);
                      }
                    } else {
                      setCodeError('Invalid access code. Please try again.');
                    }
                  }}
                  className={styles.submitModalBtn}
                >
                  Verify Code
                </button>
              </>
            ) : (
              <>
                <h2 className={styles.modalTitle}>
                  {submissionType === 'FULL_PAPER' ? 'Submit Full Paper' : 'Submit Abstract'}
                </h2>
                <p className={styles.modalSubtitle}>
                  Please fill the details below. Your submission will be recorded securely.
                </p>

                <form onSubmit={handleFormSubmit} className={styles.modalForm}>

                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="registrationNumber">Registration No. *</label>
                    <input
                      type="text"
                      id="registrationNumber"
                      required
                      value={formData.registrationNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, registrationNumber: e.target.value })
                      }
                      placeholder="Enter your registration no."
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className={styles.formGroup} style={{ marginBottom: "1.5rem" }}>
                    <label>Upload Document or Provide Link *</label>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileSelect}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        id="hero-file-upload"
                      />
                      <label htmlFor="hero-file-upload" className={styles.submitModalBtn} style={{ cursor: 'pointer', flex: 1, textAlign: 'center', padding: '0.75rem 1rem', background: selectedFile ? '#10b981' : '#3b82f6', color: 'white', display: 'block', margin: 0 }}>
                        {selectedFile ? selectedFile.name : 'Upload File'}
                      </label>
                      <span style={{ fontSize: '0.9rem', color: '#9ca3af', flex: 1 }}>
                        Supported: PDF, DOCX
                      </span>
                    </div>
                    {uploadError && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{uploadError}</span>}

                    <div style={{ margin: '1rem 0', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>OR manually paste a link below</div>

                    <input
                      type="url"
                      id="documentLink"
                      required={!selectedFile}
                      value={formData.documentLink || ""}
                      onChange={(e) => {
                        setFormData({ ...formData, documentLink: e.target.value });
                        if (e.target.value) {
                            setSelectedFile(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                        }
                      }}
                      placeholder="https://docs.google.com/... or other link"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(15, 23, 42, 0.6)',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitModalBtn}
                  >
                    {isSubmitting ? "Submitting..." : "Submit to Committee"}
                  </button>

                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Registration Number Modal */}
      {isRegModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => {
            setIsRegModalOpen(false);
            setRegEmail('');
            setFoundRegNumbers([]);
            setRegError('');
          }}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => {
                setIsRegModalOpen(false);
                setRegEmail('');
                setFoundRegNumbers([]);
                setRegError('');
              }}
            >
              <X size={24} />
            </button>

            <div style={{ paddingBottom: '0.5rem' }}>
              <h2 className={styles.modalTitle}>Know Your Registration Number</h2>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Enter Your Email or Name"
                  value={regEmail}
                  onChange={(e) => {
                    setRegEmail(e.target.value);
                    setRegError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const emailKey = regEmail.trim().toLowerCase();
                      const codes = REGISTRATION_MAPPING[emailKey];
                      if (codes) {
                        setFoundRegNumbers(codes);
                        setRegError('');
                      } else {
                        setFoundRegNumbers([]);
                        setRegError('**Your registration number will be generated once your payment has been successfully confirmed. After receiving the payment confirmation email, please try again.');
                      }
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                />
                <button
                  type="button"
                  className={styles.submitModalBtn}
                  style={{ marginTop: '1rem' }}
                  onClick={() => {
                    const emailKey = regEmail.trim().toLowerCase();
                    const codes = REGISTRATION_MAPPING[emailKey];
                    if (codes) {
                      setFoundRegNumbers(codes);
                      setRegError('');
                    } else {
                      setFoundRegNumbers([]);
                      setRegError('**Your registration number will be generated once your payment has been successfully confirmed. After receiving the payment confirmation email, please try again.');
                    }
                  }}
                >
                  Get Registration Number
                </button>
                {regError && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 500 }}>{regError}</p>}

                {foundRegNumbers.length > 0 && (
                  <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px' }}>
                    <h3 style={{ color: '#10b981', margin: '0 0 0.75rem 0', fontSize: '1.05rem', fontWeight: 600 }}>
                      Your Registration Number{foundRegNumbers.length > 1 ? 's' : ''}:
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {foundRegNumbers.map((code) => (
                        <li key={code} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'rgba(15, 23, 42, 0.4)',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px'
                        }}>
                          <span style={{ fontWeight: 'bold', letterSpacing: '1px', color: '#f8fafc' }}>
                            {code}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(code);
                              setCopiedCode(code);
                              setTimeout(() => setCopiedCode(null), 2000);
                            }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: copiedCode === code ? '#10b981' : '#94a3b8',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '0.25rem',
                              transition: 'color 0.2s',
                              outline: 'none'
                            }}
                            title="Copy code"
                          >
                            {copiedCode === code ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
