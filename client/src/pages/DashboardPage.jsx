import { useEffect, useState } from 'react';
import {
  BookOpenText,
  BookMarked,
  CirclePlus,
  GraduationCap,
  LibraryBig,
  LoaderCircle,
  NotebookText,
  RefreshCw,
  School,
} from 'lucide-react';
import DocenteFormModal from '../components/DocenteFormModal';
import DocentesTable from '../components/DocentesTable';
import ToastContainer from '../components/ToastContainer';
import {
  actualizarDocente,
  crearDocente,
  eliminarDocente,
  obtenerDocentes,
} from '../services/docentesApi';

function buildToast(title, message, type = 'info') {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    message,
    type,
  };
}

function DashboardPage() {
  const [docentes, setDocentes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedDocente, setSelectedDocente] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    loadDocentes();
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return undefined;

    const timers = toasts.map((toast) =>
      window.setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== toast.id));
      }, 3200)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [toasts]);

  const pushToast = (title, message, type) => {
    setToasts((current) => [...current, buildToast(title, message, type)]);
  };

  const loadDocentes = async (silent = false) => {
    if (silent) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const data = await obtenerDocentes();
      setDocentes(Array.isArray(data) ? data : []);
    } catch (error) {
      pushToast(
        'No fue posible cargar los docentes',
        error.response?.data?.error ?? 'Verifica que el backend este corriendo en el puerto 3001.',
        'error'
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const openCreateModal = () => {
    setSelectedDocente(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openEditModal = (docente) => {
    setSelectedDocente(docente);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    setIsSaving(true);

    try {
      if (modalMode === 'edit' && selectedDocente?.id) {
        await actualizarDocente(selectedDocente.id, payload);
        pushToast('Docente actualizado', 'Los cambios quedaron guardados correctamente.', 'success');
      } else {
        await crearDocente(payload);
        pushToast('Docente registrado', 'El nuevo docente ya aparece en el tablero.', 'success');
      }

      setIsModalOpen(false);
      setSelectedDocente(null);
      await loadDocentes(true);
    } catch (error) {
      pushToast(
        'Operacion fallida',
        error.response?.data?.error ?? 'No se pudo guardar la informacion del docente.',
        'error'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (docente) => {
    const confirmed = window.confirm(
      `Se eliminara el registro de ${docente.nombre}. Esta accion no se puede deshacer.`
    );

    if (!confirmed) return;

    try {
      await eliminarDocente(docente.id);
      pushToast('Registro eliminado', 'El docente se elimino correctamente.', 'success');
      await loadDocentes(true);
    } catch (error) {
      pushToast(
        'No se pudo eliminar',
        error.response?.data?.error ?? 'El servidor no pudo eliminar el registro.',
        'error'
      );
    }
  };

  const totalDocentes = docentes.length;
  const averageExperience = totalDocentes
    ? Math.round(
        docentes.reduce((accumulator, docente) => accumulator + Number(docente.anios_experiencia || 0), 0) /
          totalDocentes
      )
    : 0;
  const totalAreas = new Set(docentes.map((docente) => docente.area_academica)).size;

  return (
    <main className="shell relative min-h-screen px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <ToastContainer toasts={toasts} />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="panel overflow-hidden px-6 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div className="fade-up">
              <div className="eyebrow">
                <School className="h-3.5 w-3.5" />
                Coordinacion academica
              </div>

              <h1 className="mt-5 max-w-2xl text-balance text-4xl leading-[0.98] text-ink sm:text-5xl lg:text-6xl">
                Gestion docente para coordinacion academica.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Consulta el claustro, registra nuevos perfiles y actualiza expedientes desde una vista pensada como
                directorio institucional. La interfaz prioriza lectura, contexto academico y acciones rapidas para el
                trabajo cotidiano del area educativa.
              </p>
            </div>

            <div className="fade-up fade-delayed space-y-4">
              <div className="paper-note">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="campus-badge">
                      <LibraryBig className="h-3.5 w-3.5" />
                      Campus activo
                    </span>
                    <h2 className="mt-4 text-3xl leading-none text-ink">Directorio del cuerpo docente</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Un espacio para organizar perfiles, lineas de conocimiento y experiencia profesional con una
                      lectura cercana al contexto universitario.
                    </p>
                  </div>
                  <BookMarked className="mt-1 h-8 w-8 shrink-0 text-pine/70" />
                </div>
              </div>

              <div className="rounded-[28px] border border-[#eadfbe] bg-[#fff7e6] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Acciones rapidas</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <button
                    type="button"
                    onClick={openCreateModal}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-pine px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-pine/90"
                  >
                    <CirclePlus className="h-4 w-4" />
                    Registrar docente
                  </button>
                  <button
                    type="button"
                    onClick={() => loadDocentes(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#eadfbe] bg-[#fffdf7] px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-[#fff7e8]"
                  >
                    {isRefreshing ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    Actualizar listado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <article className="metric-card fade-up fade-delayed">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Claustro activo</p>
              <GraduationCap className="h-5 w-5 text-pine" />
            </div>
            <p className="mt-5 font-display text-5xl leading-none text-ink">{totalDocentes}</p>
            <p className="mt-3 text-sm text-slate-500">Perfiles docentes registrados y visibles en el directorio.</p>
          </article>

          <article className="metric-card fade-up fade-more">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Trayectoria media</p>
              <NotebookText className="h-5 w-5 text-ember" />
            </div>
            <p className="mt-5 font-display text-5xl leading-none text-ink">{averageExperience}</p>
            <p className="mt-3 text-sm text-slate-500">Promedio de anios de experiencia academica y profesional.</p>
          </article>

          <article className="metric-card fade-up fade-more">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Lineas academicas</p>
              <BookOpenText className="h-5 w-5 text-gold" />
            </div>
            <p className="mt-5 font-display text-5xl leading-none text-ink">{totalAreas}</p>
            <p className="mt-3 text-sm text-slate-500">Cantidad de areas y especialidades presentes en el panel.</p>
          </article>
        </div>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Directorio principal</p>
              <h2 className="mt-2 text-4xl text-ink">Comunidad docente</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Consulta la ficha esencial de cada docente con enfoque institucional: identidad, contacto, linea
              academica, dedicacion y trayectoria.
            </p>
          </div>

          <DocentesTable
            docentes={docentes}
            isLoading={isLoading}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        </section>
      </section>

      <DocenteFormModal
        isOpen={isModalOpen}
        mode={modalMode}
        docente={selectedDocente}
        isSaving={isSaving}
        onClose={() => {
          if (isSaving) return;
          setIsModalOpen(false);
          setSelectedDocente(null);
        }}
        onSubmit={handleSubmit}
      />
    </main>
  );
}

export default DashboardPage;
