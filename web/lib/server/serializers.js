function toIso(value) {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

export function hasRequiredLegalConsents(user) {
  return Boolean(user?.age18Confirmed && user?.entertainmentOnlyAccepted && user?.advisoryNoticeAccepted);
}

export function toUserProfile(user) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    locale: user.locale,
    age18Confirmed: Boolean(user.age18Confirmed),
    entertainmentOnlyAccepted: Boolean(user.entertainmentOnlyAccepted),
    advisoryNoticeAccepted: Boolean(user.advisoryNoticeAccepted),
    legalConsentAcceptedAt: toIso(user.legalConsentAcceptedAt),
    legalReady: hasRequiredLegalConsents(user)
  };
}

export function freeWalletSnapshot() {
  return {
    oneOffCredits: 50,
    subscriptionRemaining: 0,
    subscriptionActive: false,
    subscriptionEndsAt: null,
    totalAvailable: 50
  };
}

export function toHistoryItem(record) {
  return {
    id: record.id,
    type: record.type,
    consumedFrom: record.consumedFrom,
    question: record.question,
    resultText: record.resultText,
    createdAt: toIso(record.createdAt)
  };
}

export function toDivinationResponse(record) {
  return {
    ...toHistoryItem(record),
    wallet: freeWalletSnapshot()
  };
}
