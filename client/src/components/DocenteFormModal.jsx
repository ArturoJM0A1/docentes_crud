import { useEffect, useState } from 'react';
import { BriefcaseBusiness, GraduationCap, Mail, Phone, Save, Sparkles, X } from 'lucide-react';

const emptyForm = {
  nombre: '',
  correo: '',
  telefono: '',
  titulo: '',
  area_academica: '',
  dedicacion: '',
  anios_experiencia: 0,
};

function normalizeDocente(docente) {
  return {
    nombre: docente?.nombre ?? '',
    correo: docente?.correo ?? '',
    telefono: docente?.telefono ?? '',
    titulo: docente?.titulo ?? '',
    area_academica: docente?.area_academica ?? '',
    dedicacion: docente?.dedicacion ?? '',
    anios_experiencia: docente?.anios_experiencia ?? 0,
  };
}

function validate(values) {
  const errors = {};

  if (!values.nombre.trim()) errors.nombre = 'El nombre es obligatorio.';
  if (!values.correo.trim()) errors.correo = 'El correo es obligatorio.';
  if (!values.telefono.trim()) errors.telefono = 'El telefono es obligatorio.';
  if (!values.titulo.trim()) errors.titulo = 'El titulo es obligatorio.';
  if (!values.area_academica.trim()) errors.area_academica = 'El area academica es obligatoria.';
  if (!values.dedicacion.trim()) errors.dedicacion = 'La dedicacion es obligatoria.';

  const years = Number(values.anios_experiencia);
  if (values.anios_experiencia === '' || Number.isNaN(years)) {
    errors.anios_experiencia = 'Ingresa un numero valido.';
  } else if (years < 0) {
    errors.anios_experiencia = 'Los anios no pueden ser negativos.';
  }

  return errors;
}

function DocenteFormModal({ isOpen, mode, docente, isSaving, onClose, onSubmit }) {
  const [formValues, setFormValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormValues(docente ? normalizeDocente(docente) : emptyForm);
      setErrors({});
    }
  }, [docente, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape' && !isSaving) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, isSaving, onClose]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(formValues);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      ...formValues,
      nombre: formValues.nombre.trim(),
      correo: formValues.correo.trim(),
      telefono: formValues.telefono.trim(),
      titulo: formValues.titulo.trim(),
      area_academica: formValues.area_academica.trim(),
      dedicacion: formValues.dedicacion.trim(),
      anios_experiencia: Number(formValues.anios_experiencia),
    };

    await onSubmit(payload);
  };

  const title = mode === 'edit' ? 'Editar expediente docente' : 'Registrar nuevo docente';
  const description =
    mode === 'edit'
      ? 'Actualiza la ficha academica sin salir del panel.'
      : 'Captura los datos esenciales para integrarlo al tablero.';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/35 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) {
          onClose();
        }
      }}
    >
      <div className="panel max-h-[92vh] w-full max-w-3xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-6 pb-5 pt-6">
          <div>
            <div className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              {mode === 'edit' ? 'Modo actualizacion' : 'Modo registro'}
            </div>
            <h2 className="mt-4 text-4xl leading-none text-ink">{title}</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">{description}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded-full border border-ink/10 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Cerrar formulario"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <GraduationCap className="h-4 w-4 text-pine" />
                Nombre completo
              </span>
              <div className="field-shell">
                <input
                  className="field-input"
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleChange}
                  placeholder="Ej. Dra. Ana Torres"
                />
              </div>
              {errors.nombre ? <p className="mt-2 text-xs text-[#b0724d]">{errors.nombre}</p> : null}
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Mail className="h-4 w-4 text-pine" />
                Correo institucional
              </span>
              <div className="field-shell">
                <input
                  type="email"
                  className="field-input"
                  name="correo"
                  value={formValues.correo}
                  onChange={handleChange}
                  placeholder="ana.torres@universidad.mx"
                />
              </div>
              {errors.correo ? <p className="mt-2 text-xs text-[#b0724d]">{errors.correo}</p> : null}
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Phone className="h-4 w-4 text-pine" />
                Telefono
              </span>
              <div className="field-shell">
                <input
                  className="field-input"
                  name="telefono"
                  value={formValues.telefono}
                  onChange={handleChange}
                  placeholder="555-123-4567"
                />
              </div>
              {errors.telefono ? <p className="mt-2 text-xs text-[#b0724d]">{errors.telefono}</p> : null}
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <BriefcaseBusiness className="h-4 w-4 text-pine" />
                Titulo academico
              </span>
              <div className="field-shell">
                <input
                  className="field-input"
                  name="titulo"
                  value={formValues.titulo}
                  onChange={handleChange}
                  placeholder="Maestria en Sistemas"
                />
              </div>
              {errors.titulo ? <p className="mt-2 text-xs text-[#b0724d]">{errors.titulo}</p> : null}
            </label>

            <label className="block">
              <span className="mb-2 text-sm font-semibold text-slate-700">Area academica</span>
              <div className="field-shell">
                <input
                  className="field-input"
                  name="area_academica"
                  value={formValues.area_academica}
                  onChange={handleChange}
                  placeholder="Ingenieria en Software"
                />
              </div>
              {errors.area_academica ? (
                <p className="mt-2 text-xs text-[#b0724d]">{errors.area_academica}</p>
              ) : null}
            </label>

            <label className="block">
              <span className="mb-2 text-sm font-semibold text-slate-700">Dedicacion</span>
              <div className="field-shell">
                <select
                  className="field-input"
                  name="dedicacion"
                  value={formValues.dedicacion}
                  onChange={handleChange}
                >
                  <option value="">Selecciona una opcion</option>
                  <option value="Tiempo Completo">Tiempo Completo</option>
                  <option value="Medio Tiempo">Medio Tiempo</option>
                  <option value="Por Horas">Por Horas</option>
                  <option value="Investigacion">Investigacion</option>
                </select>
              </div>
              {errors.dedicacion ? (
                <p className="mt-2 text-xs text-[#b0724d]">{errors.dedicacion}</p>
              ) : null}
            </label>
          </div>

          <label className="block">
            <span className="mb-2 text-sm font-semibold text-slate-700">Anios de experiencia</span>
            <div className="field-shell">
              <input
                type="number"
                min="0"
                className="field-input"
                name="anios_experiencia"
                value={formValues.anios_experiencia}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
            {errors.anios_experiencia ? (
              <p className="mt-2 text-xs text-[#b0724d]">{errors.anios_experiencia}</p>
            ) : null}
          </label>

          <div className="flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Los cambios se enviaran directo a <span className="font-semibold text-pine">http://localhost:3001/docentes</span>.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="action-chip border-ink/10 bg-white/70 text-ink hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="action-chip border-pine bg-pine text-white hover:bg-pine/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'Guardando...' : mode === 'edit' ? 'Guardar cambios' : 'Crear docente'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DocenteFormModal;
