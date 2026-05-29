type Career = {
  id: string;
  title: string;
  description: string;
  employmentType: EmploymentType;
  location: string;
  status: CareerStatus;
  companyName: string;
  salary?: number;
  createdAt: Date;
  updatedAt: Date;
  responsibilities?: [];
  skills?: [];
  benefits?: [];
};

type EmploymentType = "full-time" | "contract" | "part-time" | "internship";
type CareerStatus = "open" | "closed";
