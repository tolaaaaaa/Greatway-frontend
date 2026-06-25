"use client";

import { Button, Input } from "@/app/component/ui";
import { ArrowLeft, Bold, Italic, List, ListOrdered, Heading2, Heading3 } from "lucide-react";
import PageTitle from "../../_component/pageTitle";
import { useRouter } from "next/navigation";
import { CreateCareerFormValues } from "@/validations/career/create-career.validation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const locationOptions = [
  { label: "Remote", key: "remote" },
  { label: "On-site", key: "on-site" },
];

const employmentOptions = [
  { label: "Full Time", key: "full-time" },
  { label: "Contract", key: "contract" },
  { label: "Part Time", key: "part-time" },
  { label: "Internship", key: "internship" },
];

type JobFormProps = {
  values: CreateCareerFormValues;
  onChange?: (values: CreateCareerFormValues) => void;
  onSave: (values: CreateCareerFormValues) => void;
  isSaving?: boolean;
  pageTitle?: string;
  errors?: Partial<Record<keyof CreateCareerFormValues, string>>;
};

function ToolbarButton({
  onClick,
  isActive,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-1.5 rounded hover:bg-surface-tertiary transition-colors ${
        isActive ? "text-accent bg-surface-tertiary" : "text-muted"
      }`}
    >
      {children}
    </button>
  );
}

export default function JobForm({
  values,
  onChange,
  onSave,
  isSaving = false,
  pageTitle = "Post New Job",
  errors = {},
}: JobFormProps) {
  const router = useRouter();

  const set = (key: keyof CreateCareerFormValues, value: string) =>
    onChange?.({ ...values, [key]: value });

  const editor = useEditor({
    extensions: [StarterKit],
    content: values.description,
    onUpdate: ({ editor }) => {
      set("description", editor.getHTML());
    },
  });

  // sync external value changes (e.g. edit mode pre-fill)
  useEffect(() => {
    if (editor && values.description !== editor.getHTML()) {
      editor.commands.setContent(values.description);
    }
  }, [values.description]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(values);
  };

  return (
    <form onSubmit={handleSubmit} className="font-cambay space-y-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="group cursor-pointer hover:bg-accent/10 rounded-md p-1 transition-all duration-200"
          >
            <ArrowLeft className="w-9 h-9 text-accent transition-all duration-200 group-hover:-translate-x-1 group-hover:scale-110" />
          </button>
          <PageTitle title={pageTitle} />
        </div>
        <Button
          variant="primary"
          size="lg"
          className="px-11 py-4 rounded-[15px]"
          type="submit"
          isDisabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Input
          label="Job Title"
          name="title"
          placeholder="Enter Title"
          value={values.title}
          onChange={(val) => set("title", val)}
          error={errors.title}
        />
        <Input
          label="Company Name"
          name="companyName"
          placeholder="Enter company name"
          value={values.companyName}
          onChange={(val) => set("companyName", val)}
          error={errors.companyName}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Input
          label="Location"
          name="location"
          placeholder="Select Location"
          type="select"
          options={locationOptions}
          value={values.location}
          onChange={(val) => set("location", val)}
          error={errors.location}
        />
        <Input
          label="Employment Type"
          name="employmentType"
          placeholder="Select Employment Type"
          type="select"
          options={employmentOptions}
          value={values.employmentType}
          onChange={(val) => set("employmentType", val)}
          error={errors.employmentType}
        />
      </div>

      {/* Rich Text Editor */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Job Description
        </label>
        <div
          className={`border rounded-lg overflow-hidden ${
            errors.description ? "border-danger" : "border-border"
          }`}
        >
          {/* Toolbar */}
          <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-surface-secondary flex-wrap">
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBold().run()}
              isActive={editor?.isActive("bold")}
            >
              <Bold size={15} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              isActive={editor?.isActive("italic")}
            >
              <Italic size={15} />
            </ToolbarButton>
            <div className="w-px h-4 bg-border mx-1" />
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor?.isActive("heading", { level: 2 })}
            >
              <Heading2 size={15} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor?.isActive("heading", { level: 3 })}
            >
              <Heading3 size={15} />
            </ToolbarButton>
            <div className="w-px h-4 bg-border mx-1" />
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              isActive={editor?.isActive("bulletList")}
            >
              <List size={15} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              isActive={editor?.isActive("orderedList")}
            >
              <ListOrdered size={15} />
            </ToolbarButton>
          </div>

          {/* Editor content */}
          <EditorContent
            editor={editor}
            className="min-h-64 px-4 py-3 text-sm text-foreground focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-56 [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-2 [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:mb-1 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_li]:mb-1 [&_.ProseMirror_p]:mb-2"
          />
        </div>
        {errors.description && (
          <p className="text-xs text-danger">{errors.description}</p>
        )}
      </div>
    </form>
  );
}