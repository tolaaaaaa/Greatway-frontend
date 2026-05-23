import { Bed, Bath, Warehouse, Trees, Sofa, Maximize } from "lucide-react";

export const getFeatureIcon = (featureText: string) => {
  const normalizedText = featureText.toLowerCase().trim();

  if (normalizedText.includes("bedroom")) return <Bed size={16} />;
  if (normalizedText.includes("bathroom")) return <Bath size={16} />;
  if (normalizedText.includes("garage")) return <Warehouse size={16} />;
  if (normalizedText.includes("garden")) return <Trees size={16} />;
  if (
    normalizedText.includes("livingroom") ||
    normalizedText.includes("living room")
  )
    return <Sofa size={16} />;
  if (
    normalizedText.includes("squarefeet") ||
    normalizedText.includes("square feet")
  )
    return <Maximize size={16} />;

  return <Maximize size={16} />;
};


const featureLabels: Record<string, { singular: string; plural: string }> = {
  bedrooms: { singular: "Bedroom", plural: "Bedrooms" },
  bathrooms: { singular: "Bathroom", plural: "Bathrooms" },
  garage: { singular: "Garage", plural: "Garages" },
  livingRoom: { singular: "Living Room", plural: "Living Rooms" },
  squareFeet: { singular: "Square Feet", plural: "Square Feet" },
  garden: { singular: "Garden", plural: "Gardens" },
  pool: { singular: "Pool", plural: "Pools" },
  toilet: { singular: "Toilet", plural: "Toilets" },
};

export function getFeatureDescription(
  description: string,
  icon: string,
): string {
  // Extract the number from the description (handles "3", "3 bedrooms", "3 bedroom", "3bed" etc)
  const numberMatch = description.match(/\d+(\.\d+)?/);
  if (!numberMatch) return description; // fallback to original if no number found

  const count = parseFloat(numberMatch[0]);
  const label = featureLabels[icon];

  if (!label) return description; // fallback if icon not in map

  const word = count === 1 ? label.singular : label.plural;
  return `${count} ${word}`;
}
