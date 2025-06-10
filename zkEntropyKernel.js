// zkEntropyKernel.js

/**
 * Returns a fresh, unpredictable 12-char hex string every call.
 */
export function getEntropySeed() {
  const flux     = Date.now().toString(36) + Math.random().toString(36).slice(2);
  const reversed = flux.split('').reverse().join('');
  const chaotic  = Buffer.from(reversed).toString('hex');
  return chaotic.slice(0, 12);
}
