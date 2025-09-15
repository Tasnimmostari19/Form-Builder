import { FormBuilder } from "@/components/form-builder/FormBuilder";

export default function Home() {
  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto] gap-[32px] px-[32px] bg-gray-50">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="container mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Dynamic Form Builder
            </h1>
          </header>
          <FormBuilder />
        </div>
      </main>
    </div>
  );
}
