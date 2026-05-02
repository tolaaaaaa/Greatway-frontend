type Career = {
  id: string;
  title: string;
  description: string;
  employmentType: EmploymentType;
  location: string;
  status: CareerStatus;
  companyName: string;
  createdAt: Date;
  updatedAt: Date;
};

type EmploymentType = "full-time" | "contract" | "part-time" | "internship";
type CareerStatus = "open" | "closed";
