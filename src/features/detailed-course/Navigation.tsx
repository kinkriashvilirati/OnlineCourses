import PageLocationNav from "../../components/shared/PageLocationNav";

export default function Header({ title }: { title: string }) {
  return (
    <header aria-label="Detailed Page Header">
      <PageLocationNav coursePage={"Category"} />
      <h1 className="text-h1 text-grayscale-950">{title}</h1>
    </header>
  );
}
