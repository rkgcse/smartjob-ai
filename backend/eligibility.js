function calculateAge(dob) {
  return Math.floor((new Date() - new Date(dob)) / (365 * 24 * 60 * 60 * 1000));
}

function checkEligibility(user, job) {
  let reasons = [];

  let age = calculateAge(user.dob);
  let maxAge = job.max_age + (job.category_relaxation[user.category] || 0);

  if (age < job.min_age || age > maxAge)
    reasons.push("Age not in allowed range");

  if (user.education !== job.qualification)
    reasons.push("Required qualification not met");

  let userSkills = user.cv_data?.skills || [];
  let missing = job.skills_required.filter(s => !userSkills.includes(s));
  if (missing.length > 0)
    reasons.push("Missing skills: " + missing.join(", "));

  if ((user.cv_data?.experience_years || 0) < job.experience_required)
    reasons.push("Not enough experience");

  return {
    eligible: reasons.length === 0,
    reason: reasons.length === 0 ? "All eligibility conditions satisfied" : reasons.join(" | ")
  };
}
