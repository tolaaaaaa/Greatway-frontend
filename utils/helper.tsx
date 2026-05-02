import { Bed, Bath, Warehouse, Trees, Sofa, Maximize } from "lucide-react";

export const getFeatureIcon = (featureText: string) => {
  const normalizedText = featureText.toLowerCase().trim();

  if (normalizedText.includes('bedroom')) return <Bed size={16} />;
  if (normalizedText.includes('bathroom')) return <Bath size={16} />;
  if (normalizedText.includes('garage')) return <Warehouse size={16} />;
  if (normalizedText.includes('garden')) return <Trees size={16} />;
  if (normalizedText.includes('livingroom') || normalizedText.includes('living room')) return <Sofa size={16} />;
  if (normalizedText.includes('squarefeet') || normalizedText.includes('square feet')) return <Maximize size={16} />;

  return <Maximize size={16} />;
};