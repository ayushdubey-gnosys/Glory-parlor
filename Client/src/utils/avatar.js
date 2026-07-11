import femaleImg from "../assets/female  01.png";
import maleImg from "../assets/male profile 01.png";

export function getAvatarUrl(person) {
  if (!person) return femaleImg;

  // Check if person has a customized profile pic uploaded
  const pic = person.profilePic || person.avatar;
  const isCustomPic =
    pic &&
    typeof pic === "string" &&
    !pic.includes("sample.jpg") &&
    !pic.includes("ui-avatars.com") &&
    !pic.includes("placeholder.com") &&
    pic.trim() !== "";

  if (isCustomPic) {
    return pic;
  }

  // If no custom profile pic, check gender for default photo
  const gender = (person.gender || person.sex || "").toLowerCase().trim();
  if (gender === "male" || gender === "m") {
    return maleImg;
  }

  return femaleImg;
}
