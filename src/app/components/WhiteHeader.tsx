export default function WhiteHeader({children}: {children: JSX.Element}) {
  return <div className="flex items-center bg-base-color w-full py-4">{children}</div>;
}
