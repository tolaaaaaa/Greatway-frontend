interface PageTitleProps {
  title: string
  className?: string
}

export default function PageTitle({ title, className = '' }: PageTitleProps) {
  return (
    <h2 className={`font-bold text-3xl text-foreground ${className}`}>
      {title}
    </h2>
  )
}