export type ThemePreference = 'LIGHT' | 'DARK' | 'SYSTEM';
export type TargetDevice = 'desktop' | 'mobile';
export type RankDirection = 'UP' | 'DOWN' | 'NEW' | 'UNCHANGED' | 'UNRANKED';
export type CheckStatus = 'PENDING' | 'CHECKING' | 'COMPLETED' | 'FAILED';
export type AlertType = 'RANK_ABOVE_100' | 'DROPPED_OUT' | 'RANK_DROP' | 'RANK_GAIN';

export interface AuthUser {
  id: number;
  email: string;
  fullName: string;
  themePreference: ThemePreference;
  emailAlertsEnabled: boolean;
  dailyApiQuota: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface UpdatePreferencesPayload {
  themePreference?: ThemePreference;
  emailAlertsEnabled?: boolean;
  fullName?: string;
}

export interface UserQuota {
  dailyLimit: number;
  usedToday: number;
  remainingToday: number;
}

export interface DomainSummary {
  id: number;
  domainName: string;
  targetCountry: string;
  targetDevice: TargetDevice;
  keywordCount: number;
  top10Count: number;
  top100Count: number;
  averageRank: number | null;
  lastCheckedAt: string | null;
}

export interface CreateDomainPayload {
  domainName: string;
  targetCountry: string;
  targetDevice: TargetDevice;
}

export interface KeywordRow {
  id: number;
  domainId: number;
  phrase: string;
  currentRank: number | null;
  previousRank: number | null;
  rankDelta: number | null;
  rankDirection: RankDirection;
  bestRank: number | null;
  rankingUrl: string | null;
  checkStatus: CheckStatus;
  lastError: string | null;
  lastCheckedAt: string | null;
}

export interface RankHistoryPoint {
  id: number;
  rankPosition: number | null;
  rankingUrl: string | null;
  serpFeatures: string[];
  source: 'MANUAL' | 'SCHEDULED' | 'BATCH';
  checkedAt: string;
}

export interface BatchAccepted {
  batchId: number;
  domainId: number;
  totalKeywords: number;
  completedKeywords: number;
  failedKeywords: number;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'PARTIAL_FAILURE';
}

export interface AlertItem {
  id: number;
  domainId: number;
  domainName: string;
  keywordId: number;
  keywordPhrase: string;
  alertType: AlertType;
  oldRank: number | null;
  newRank: number | null;
  outOfTop100: boolean;
  message: string;
  isRead: boolean;
  createdAt: string;
}
