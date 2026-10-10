/**
 * Centralized Configuration for Abstract Submission status.
 *
 * Default state: CLOSED (false)
 *
 * To reopen abstract submissions:
 * 1. Set process.env.NEXT_PUBLIC_ABSTRACT_SUBMISSIONS_OPEN = 'true', OR
 * 2. Change IS_ABSTRACT_SUBMISSION_OPEN below to true.
 */
export const IS_ABSTRACT_SUBMISSION_OPEN: boolean =
  process.env.NEXT_PUBLIC_ABSTRACT_SUBMISSIONS_OPEN === 'true' ? true : false;

export const ABSTRACT_SUBMISSION_CLOSED_HEADING = 'Abstract Submission Closed';
export const ABSTRACT_SUBMISSION_CLOSED_MESSAGE =
  'Submission is over, no further submissions are accepted.';
