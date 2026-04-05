import { Pencil, Trash2 } from 'lucide-react';

function DocentesTable({ docentes, isLoading, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div className="table-scaffold p-8">
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div
              key={`skeleton-${index + 1}`}
              className="h-16 animate-pulse rounded-2xl bg-slate-200/70"
            />
          ))}
        </div>
      </div>
    );
  }

  if (docentes.length === 0) {
    return (
      <div className="table-scaffold px-6 py-16 text-center">
        <p className="font-display text-4xl text-ink">Sin docentes registrados</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
          Crea el primer expediente para comenzar a poblar el tablero academico.
        </p>
      </div>
    );
  }

  return (
    <div className="table-scaffold">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-[#fbf4e2]">
            <tr className="text-xs uppercase tracking-[0.22em] text-slate-500">
              <th className="px-6 py-4 font-semibold">Docente</th>
              <th className="px-6 py-4 font-semibold">Correo</th>
              <th className="px-6 py-4 font-semibold">Titulo</th>
              <th className="px-6 py-4 font-semibold">Area</th>
              <th className="px-6 py-4 font-semibold">Dedicacion</th>
              <th className="px-6 py-4 font-semibold">Experiencia</th>
              <th className="px-6 py-4 text-right font-semibold">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {docentes.map((docente) => (
              <tr
                key={docente.id}
                className="border-t border-[#eee0c2] transition-colors hover:bg-[#fffaf0]"
              >
                <td className="px-6 py-5">
                  <div>
                    <p className="font-semibold text-ink">{docente.nombre}</p>
                    <p className="mt-1 text-sm text-slate-500">{docente.telefono}</p>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-slate-600">{docente.correo}</td>
                <td className="px-6 py-5 text-sm text-slate-600">{docente.titulo}</td>
                <td className="px-6 py-5 text-sm text-slate-600">{docente.area_academica}</td>
                <td className="px-6 py-5">
                  <span className="rounded-full border border-[#e7d5aa] bg-[#fff5d8] px-3 py-1 text-xs font-semibold text-pine">
                    {docente.dedicacion}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-semibold text-ink">
                  {docente.anios_experiencia} anios
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(docente)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e9dec5] bg-[#fffdf7] px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-pine/40 hover:bg-[#fff7e3] hover:text-pine"
                    >
                      <Pencil className="h-4 w-4" />
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(docente)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#ebcfbc] bg-[#fff5ef] px-4 py-2 text-sm font-semibold text-[#946345] transition hover:-translate-y-0.5 hover:bg-[#fcebdd]"
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocentesTable;
