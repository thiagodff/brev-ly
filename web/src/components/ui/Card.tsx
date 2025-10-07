interface CardProps extends React.ComponentProps<"section"> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <section
      className={`bg-gray-100 p-6 md:p-8 rounded-lg flex flex-col ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
