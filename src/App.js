import { useState } from "react";

// ─── DATOS MOCK ───────────────────────────────────────────────────────────────

const PLANES = [
  { id: "basico",    nombre: "Básico",    propiedades: 20,   uf: 0.5, pesos: 18000,  color: "#1A3A7A", bg: "#E8F0FB" },
  { id: "estandar",  nombre: "Estándar",  propiedades: 40,   uf: 0.8, pesos: 29000,  color: "#7D5A00", bg: "#FEF9E7" },
  { id: "pro",       nombre: "Pro",       propiedades: 80,   uf: 1.2, pesos: 43000,  color: "#1A6B3C", bg: "#E8F5EE" },
  { id: "ilimitado", nombre: "Ilimitado", propiedades: 9999, uf: 1.8, pesos: 65000,  color: "#6B1A1A", bg: "#FDE8E8" },
];

const MODULOS = [
  { id: "inventario",    nombre: "Inventario de Propiedades", icon: "camera" },
  { id: "propiedades",   nombre: "Gestión de Propiedades",    icon: "home" },
  { id: "arrendatarios", nombre: "Arrendatarios y Contratos", icon: "users" },
  { id: "financiero",    nombre: "Dashboard Financiero",      icon: "chart" },
];

const DATOS_BANCARIOS = {
  banco: "Banco Santander",
  tipoCuenta: "Cuenta Corriente",
  numero: "00-123-45678-09",
  rut: "76.543.210-K",
  nombre: "Tempvs7 SpA",
  email: "pagos@tempvs7.cl",
};

const initCorredoras = [
  { id: 1, empresa: "Inmobiliaria Sur Ltda.", rut: "76.123.456-7", email: "contacto@inmsur.cl", telefono: "+56 9 8765 4321", plan: "pro", estado: "activa", logo: null, fechaVenc: "2025-08-15", comprobante: null, modulosExtra: [] },
  { id: 2, empresa: "Propiedades Centro S.A.", rut: "76.987.654-3", email: "admin@propcentro.cl", telefono: "+56 9 1234 5678", plan: "basico", estado: "pendiente", logo: null, fechaVenc: null, comprobante: "comprobante_pendiente.jpg", modulosExtra: [] },
  { id: 3, empresa: "Corredora Norte", rut: "12.345.678-9", email: "norte@corredor.cl", telefono: "+56 9 9988 7766", plan: "estandar", estado: "pendiente", logo: null, fechaVenc: null, comprobante: null, modulosExtra: [] },
];

const propiedades = [
  { id: 1, codigo: "PM-001", nombre: "Depto 4B Torre Andes", tipo: "Departamento", direccion: "Av. Providencia 1840, Piso 4", comuna: "Providencia", m2: 68, habitaciones: 2, banos: 1, estacionamiento: true, bodega: false, valorArriendo: 680000, estado: "arrendado", propietario: "Rodrigo Fuentes", propietarioTel: "+56 9 8123 4567" },
  { id: 2, codigo: "PM-002", nombre: "Casa Ñuñoa", tipo: "Casa", direccion: "Irarrázaval 3210", comuna: "Ñuñoa", m2: 120, habitaciones: 3, banos: 2, estacionamiento: true, bodega: true, valorArriendo: 950000, estado: "disponible", propietario: "Carmen Valdés", propietarioTel: "+56 9 7654 3210" },
  { id: 3, codigo: "PM-003", nombre: "Oficina Centro", tipo: "Oficina", direccion: "Huérfanos 669, Of. 712", comuna: "Santiago", m2: 45, habitaciones: 0, banos: 1, estacionamiento: false, bodega: false, valorArriendo: 520000, estado: "arrendado", propietario: "Inversiones Ltda.", propietarioTel: "+56 2 2345 6789" },
  { id: 4, codigo: "PM-004", nombre: "Depto 2A Las Condes", tipo: "Departamento", direccion: "Apoquindo 5555, Piso 2", comuna: "Las Condes", m2: 55, habitaciones: 2, banos: 1, estacionamiento: true, bodega: false, valorArriendo: 750000, estado: "revision", propietario: "Ana Morales", propietarioTel: "+56 9 9988 7766" },
];

const arrendatarios = [
  { id: 1, nombre: "Martina González", rut: "12.345.678-9", email: "martina@email.cl", telefono: "+56 9 1111 2222", propiedadId: 1, inicioContrato: "2023-03-01", finContrato: "2025-02-28", valorMensual: 680000, deposito: 1360000, estadoPago: "al_dia", diaVencimiento: 5 },
  { id: 2, nombre: "Empresa Tech SpA", rut: "76.543.210-K", email: "admin@tech.cl", telefono: "+56 2 3333 4444", propiedadId: 3, inicioContrato: "2024-01-01", finContrato: "2025-12-31", valorMensual: 520000, deposito: 1040000, estadoPago: "moroso", diaVencimiento: 1 },
];

const pagos = [
  { id: 1, arrendatarioId: 1, propiedadId: 1, mes: "Mayo 2025", monto: 680000, fechaPago: "2025-05-04", estado: "pagado", comprobante: "TRF-8821" },
  { id: 2, arrendatarioId: 1, propiedadId: 1, mes: "Junio 2025", monto: 680000, fechaPago: null, estado: "pendiente", comprobante: null },
  { id: 3, arrendatarioId: 2, propiedadId: 3, mes: "Mayo 2025", monto: 520000, fechaPago: null, estado: "vencido", comprobante: null },
  { id: 4, arrendatarioId: 2, propiedadId: 3, mes: "Junio 2025", monto: 520000, fechaPago: null, estado: "vencido", comprobante: null },
];

const revisionItems = [
  { id: "piso",      categoria: "Pisos y Muros",     label: "Pisos sin daños" },
  { id: "muros",     categoria: "Pisos y Muros",     label: "Muros sin humedad ni grietas" },
  { id: "pintura",   categoria: "Pisos y Muros",     label: "Pintura en buen estado" },
  { id: "puertas",   categoria: "Puertas y Ventanas", label: "Puertas funcionando correctamente" },
  { id: "ventanas",  categoria: "Puertas y Ventanas", label: "Ventanas sin roturas" },
  { id: "cerraduras",categoria: "Puertas y Ventanas", label: "Cerraduras operativas" },
  { id: "agua",      categoria: "Instalaciones",     label: "Agua caliente y fría operativa" },
  { id: "electricidad",categoria:"Instalaciones",    label: "Circuito eléctrico sin fallas" },
  { id: "gas",       categoria: "Instalaciones",     label: "Gas sin filtraciones" },
  { id: "cocina",    categoria: "Cocina y Baños",    label: "Cocina sin daños" },
  { id: "bano",      categoria: "Cocina y Baños",    label: "Sanitarios en buen estado" },
  { id: "ducha",     categoria: "Cocina y Baños",    label: "Ducha sin problemas" },
  { id: "limpieza",  categoria: "General",           label: "Inmueble limpio" },
  { id: "jardin",    categoria: "General",           label: "Áreas comunes / jardín" },
  { id: "estacionamiento", categoria: "General",     label: "Estacionamiento sin daños" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const fmt = (n) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

const estadoProps   = { arrendado: { label: "Arrendado", color: "green" }, disponible: { label: "Disponible", color: "blue" }, revision: { label: "En revisión", color: "yellow" }, mantencion: { label: "Mantención", color: "red" } };
const estadoPagoP   = { pagado: { label: "Pagado", color: "green" }, pendiente: { label: "Pendiente", color: "yellow" }, vencido: { label: "Vencido", color: "red" } };
const estadoCorrP   = { activa: { label: "Activa", color: "green" }, pendiente: { label: "Pendiente pago", color: "yellow" }, suspendida: { label: "Suspendida", color: "red" }, gracia: { label: "Período de gracia", color: "orange" } };

function Badge({ color, children }) {
  const map = { green: ["#d1fae5","#065f46"], red: ["#fee2e2","#991b1b"], yellow: ["#fef3c7","#92400e"], blue: ["#dbeafe","#1e40af"], gray: ["#f3f4f6","#374151"], orange: ["#ffedd5","#9a3412"] };
  const [bg, tc] = map[color] || map.gray;
  return <span style={{ background: bg, color: tc, fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 99, letterSpacing: 0.3, whiteSpace: "nowrap" }}>{children}</span>;
}

// ─── VALIDACIONES ─────────────────────────────────────────────────────────────

function validarNombrePropio(val) {
  if (!val.trim()) return "Campo requerido";
  if (val === val.toUpperCase()) return "No uses todo mayúsculas";
  if (val === val.toLowerCase()) return "La primera letra debe ser mayúscula";
  if (!/^[A-ZÁÉÍÓÚÑ]/.test(val.trim())) return "Debe comenzar con mayúscula";
  return "";
}

function validarRut(val) {
  if (!val.trim()) return "Campo requerido";
  if (!/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(val)) return "Formato: XX.XXX.XXX-X";
  return "";
}

function validarEmail(val) {
  if (!val.trim()) return "Campo requerido";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Email inválido";
  return "";
}

function validarTelefono(val) {
  if (!val.trim()) return "Campo requerido";
  if (!/^\+56\s9\s\d{4}\s\d{4}$/.test(val)) return "Formato: +56 9 XXXX XXXX";
  return "";
}

function validarPassword(val) {
  if (!val) return "Campo requerido";
  if (val.length < 8) return "Mínimo 8 caracteres";
  return "";
}

// ─── ICONOS ───────────────────────────────────────────────────────────────────

const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    home:      <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 22V12h6v10"/></svg>,
    users:     <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    clipboard: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><path d="M9 12l2 2 4-4"/></svg>,
    chart:     <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
    camera:    <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
    plus:      <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    check:     <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
    x:         <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    arrow:     <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>,
    alert:     <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24"><polygon points="12 2 22 21 2 21"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    key:       <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="8" cy="15" r="5"/><path d="M15.5 8.5L21 3M18 6l2 2"/></svg>,
    building:  <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>,
    logout:    <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
    shield:    <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    upload:    <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
    eye:       <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    settings:  <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  };
  return icons[name] || null;
};

// ─── COMPONENTES UI ───────────────────────────────────────────────────────────

function Input({ label, value, onChange, error, placeholder, type = "text", hint }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, letterSpacing: 0.2 }}>{label}</label>
      {hint && <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 4 }}>{hint}</div>}
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1.5px solid ${error ? "#FCA5A5" : "#E5E7EB"}`, fontSize: 14, fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", outline: "none", background: error ? "#FFF5F5" : "#fff", color: "#111", boxSizing: "border-box", transition: "border .15s" }}
      />
      {error && <div style={{ fontSize: 11, color: "#DC2626", marginTop: 4 }}>{error}</div>}
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", size = "md", icon, disabled, fullWidth }) {
  const variants = {
    primary:   { background: "#1A1A2E", color: "#fff", border: "none" },
    secondary: { background: "#fff", color: "#1A1A2E", border: "1.5px solid #E5E7EB" },
    success:   { background: "#059669", color: "#fff", border: "none" },
    danger:    { background: "#DC2626", color: "#fff", border: "none" },
    ghost:     { background: "transparent", color: "#6B7280", border: "none" },
  };
  const sizes = { sm: { padding: "6px 12px", fontSize: 12 }, md: { padding: "10px 18px", fontSize: 13 }, lg: { padding: "13px 24px", fontSize: 14 } };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ ...variants[variant], ...sizes[size], borderRadius: 9, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 7, opacity: disabled ? 0.5 : 1, width: fullWidth ? "100%" : "auto", justifyContent: fullWidth ? "center" : "flex-start", transition: "opacity .15s" }}>
      {icon && <Icon name={icon} size={14} color="currentColor" />}
      {children}
    </button>
  );
}

// ─── PANTALLA LOGIN ───────────────────────────────────────────────────────────

function LoginScreen({ onLogin, onRegistro }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "admin@tempvs7.cl" && password === "admin123") {
      onLogin({ rol: "admin", nombre: "Administrador Tempvs7" });
    } else if (email === "contacto@inmsur.cl" && password === "corredora123") {
      onLogin({ rol: "corredora", nombre: "Inmobiliaria Sur Ltda.", corrodoraId: 1 });
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F2F2F7", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>

        {/* Wordmark */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-block" }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#1A1A2E", letterSpacing: -1.2, fontFamily: "-apple-system, 'SF Pro Display', BlinkMacSystemFont, sans-serif", lineHeight: 1 }}>
              PropManager
            </div>
            <div style={{ fontSize: 11, color: "#B0B8C1", letterSpacing: 2.5, textTransform: "uppercase", marginTop: 5, fontWeight: 500, textAlign: "center" }}>
              by Tempvs7
            </div>
          </div>
        </div>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: 20, border: "none", padding: "32px 28px 24px", boxShadow: "0 1px 3px rgba(0,0,0,.08), 0 8px 32px rgba(0,0,0,.06)" }}>
          <h2 style={{ fontSize: 19, fontWeight: 600, color: "#1A1A2E", margin: "0 0 4px", letterSpacing: -0.3 }}>Iniciar sesión</h2>
          <p style={{ color: "#9CA3AF", fontSize: 13, margin: "0 0 24px" }}>Ingresa tus credenciales para continuar</p>

          <Input label="Correo electrónico" value={email} onChange={setEmail} placeholder="tu@empresa.cl" type="email" />
          <Input label="Contraseña" value={password} onChange={setPassword} placeholder="••••••••" type="password" />

          {error && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#DC2626", marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
              <Icon name="alert" size={14} color="#DC2626" /> {error}
            </div>
          )}

          <Btn fullWidth onClick={handleLogin} variant="primary" size="lg">Ingresar al sistema</Btn>

          <div style={{ textAlign: "center", marginTop: 20, paddingTop: 20, borderTop: "1px solid #F3F4F6" }}>
            <span style={{ fontSize: 13, color: "#9CA3AF" }}>¿No tienes cuenta? </span>
            <button onClick={onRegistro} style={{ fontSize: 13, color: "#1A1A2E", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}>
              Regístrate aquí
            </button>
          </div>
        </div>

        {/* Demo hint */}
        <div style={{ marginTop: 16, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, padding: "12px 16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#065F46", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Demo — Credenciales de prueba</div>
          <div style={{ fontSize: 12, color: "#059669" }}>Admin: admin@tempvs7.cl / admin123</div>
          <div style={{ fontSize: 12, color: "#059669" }}>Corredora: contacto@inmsur.cl / corredora123</div>
        </div>
      </div>
    </div>
  );
}

// ─── REGISTRO CORREDORA ───────────────────────────────────────────────────────

function RegistroScreen({ onVolver }) {
  const [step, setStep] = useState(1); // 1=datos, 2=plan, 3=pago, 4=confirmacion
  const [form, setForm] = useState({ empresa: "", rut: "", email: "", telefono: "", password: "", password2: "", planId: "" });
  const [errors, setErrors] = useState({});

  const setF = (k) => (v) => setForm(p => ({ ...p, [k]: v }));

  const validarPaso1 = () => {
    const e = {};
    e.empresa  = validarNombrePropio(form.empresa);
    e.rut      = validarRut(form.rut);
    e.email    = validarEmail(form.email);
    e.telefono = validarTelefono(form.telefono);
    e.password = validarPassword(form.password);
    if (form.password !== form.password2) e.password2 = "Las contraseñas no coinciden";
    else if (!form.password2) e.password2 = "Campo requerido";
    else e.password2 = "";
    setErrors(e);
    return Object.values(e).every(v => !v);
  };

  const planSel = PLANES.find(p => p.id === form.planId);

  return (
    <div style={{ minHeight: "100vh", background: "#F2F2F7", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", padding: "24px 16px" }}>
      <div style={{ maxWidth: 580, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
          <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#007AFF", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 500, padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
            ‹ Volver
          </button>
          <div style={{ flex: 1, textAlign: "center" }}>
            <span style={{ fontSize: 17, fontWeight: 600, color: "#1A1A2E", letterSpacing: -0.4 }}>PropManager</span>
            <span style={{ fontSize: 12, color: "#B0B8C1", marginLeft: 6 }}>by Tempvs7</span>
          </div>
          <div style={{ width: 60 }} />
        </div>

        {/* Steps */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 32, gap: 0 }}>
          {["Datos empresa", "Elige plan", "Pago", "Listo"].map((s, i) => {
            const num = i + 1;
            const active = step === num;
            const done = step > num;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: i < 3 ? 1 : "none" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: done ? "#059669" : active ? "#1A1A2E" : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s" }}>
                    {done ? <Icon name="check" size={14} color="#fff" /> : <span style={{ fontSize: 13, fontWeight: 700, color: active ? "#C8A96E" : "#9CA3AF" }}>{num}</span>}
                  </div>
                  <span style={{ fontSize: 10, color: active ? "#1A1A2E" : "#9CA3AF", fontWeight: active ? 700 : 400, whiteSpace: "nowrap" }}>{s}</span>
                </div>
                {i < 3 && <div style={{ flex: 1, height: 2, background: done ? "#059669" : "#E5E7EB", margin: "0 4px", marginBottom: 18, transition: "background .2s" }} />}
              </div>
            );
          })}
        </div>

        {/* PASO 1 — Datos */}
        {step === 1 && (
          <div style={{ background: "#fff", borderRadius: 16, border: "0.5px solid rgba(0,0,0,.08)", padding: "28px 32px" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1A1A2E", margin: "0 0 6px" }}>Datos de tu empresa</h2>
            <p style={{ color: "#9CA3AF", fontSize: 13, margin: "0 0 24px" }}>Completa la información de tu corredora</p>
            <Input label="Nombre de la empresa" value={form.empresa} onChange={setF("empresa")} placeholder="Ej: Inmobiliaria Central S.A." error={errors.empresa} hint="Primera letra mayúscula, sin todo mayúsculas ni minúsculas" />
            <Input label="RUT empresa" value={form.rut} onChange={setF("rut")} placeholder="76.123.456-7" error={errors.rut} hint="Formato: XX.XXX.XXX-X" />
            <Input label="Correo electrónico" value={form.email} onChange={setF("email")} placeholder="contacto@empresa.cl" type="email" error={errors.email} />
            <Input label="Teléfono" value={form.telefono} onChange={setF("telefono")} placeholder="+56 9 1234 5678" error={errors.telefono} hint="Formato: +56 9 XXXX XXXX" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Input label="Contraseña" value={form.password} onChange={setF("password")} placeholder="••••••••" type="password" error={errors.password} hint="Mínimo 8 caracteres" />
              <Input label="Repetir contraseña" value={form.password2} onChange={setF("password2")} placeholder="••••••••" type="password" error={errors.password2} />
            </div>
            <div style={{ marginTop: 8 }}>
              <Btn fullWidth size="lg" onClick={() => { if (validarPaso1()) setStep(2); }}>Continuar →</Btn>
            </div>
          </div>
        )}

        {/* PASO 2 — Plan */}
        {step === 2 && (
          <div>
            <div style={{ background: "#fff", borderRadius: 16, border: "0.5px solid rgba(0,0,0,.08)", padding: "28px 32px", marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1A1A2E", margin: "0 0 6px" }}>Elige tu plan</h2>
              <p style={{ color: "#9CA3AF", fontSize: 13, margin: "0 0 24px" }}>Todos los planes incluyen los 4 módulos completos</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {PLANES.map(plan => (
                  <div key={plan.id} onClick={() => setF("planId")(plan.id)}
                    style={{ borderRadius: 14, border: `2px solid ${form.planId === plan.id ? plan.color : "#E5E7EB"}`, padding: "16px", cursor: "pointer", background: form.planId === plan.id ? plan.bg : "#fff", transition: "all .15s" }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: plan.color, marginBottom: 4 }}>{plan.nombre}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#1A1A2E", marginBottom: 2 }}>{plan.uf} UF <span style={{ fontSize: 12, fontWeight: 400, color: "#9CA3AF" }}>/mes</span></div>
                    <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 10 }}>≈ {fmt(plan.pesos)}/mes</div>
                    <div style={{ fontSize: 12, color: "#555" }}>{plan.propiedades === 9999 ? "Propiedades ilimitadas" : `Hasta ${plan.propiedades} propiedades`}</div>
                    <div style={{ fontSize: 11, color: "#059669", marginTop: 6, fontWeight: 600 }}>✓ Todos los módulos incluidos</div>
                    {form.planId === plan.id && (
                      <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}>
                        <Icon name="check" size={14} color={plan.color} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: plan.color }}>Seleccionado</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="secondary" onClick={() => setStep(1)}>← Atrás</Btn>
              <Btn variant="primary" onClick={() => { if (form.planId) setStep(3); }} disabled={!form.planId} size="md">Continuar →</Btn>
            </div>
          </div>
        )}

        {/* PASO 3 — Pago */}
        {step === 3 && planSel && (
          <div>
            <div style={{ background: "#fff", borderRadius: 16, border: "0.5px solid rgba(0,0,0,.08)", padding: "28px 32px", marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1A1A2E", margin: "0 0 6px" }}>Realiza tu pago</h2>
              <p style={{ color: "#9CA3AF", fontSize: 13, margin: "0 0 24px" }}>Transfiere el valor de tu plan a los datos indicados</p>

              {/* Resumen plan */}
              <div style={{ background: planSel.bg, borderRadius: 10, padding: "14px 16px", marginBottom: 20, border: `1px solid ${planSel.color}22` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4 }}>Plan seleccionado</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: planSel.color, marginTop: 2 }}>Plan {planSel.nombre}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: "#1A1A2E" }}>{planSel.uf} UF</div>
                    <div style={{ fontSize: 13, color: "#9CA3AF" }}>≈ {fmt(planSel.pesos)}/mes</div>
                  </div>
                </div>
              </div>

              {/* Datos bancarios */}
              <div style={{ background: "#F8F9FA", borderRadius: 10, padding: "16px 18px", marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1A1A2E", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14 }}>Datos para transferencia</div>
                {[
                  ["Banco", DATOS_BANCARIOS.banco],
                  ["Tipo de cuenta", DATOS_BANCARIOS.tipoCuenta],
                  ["Número de cuenta", DATOS_BANCARIOS.numero],
                  ["RUT", DATOS_BANCARIOS.rut],
                  ["Nombre", DATOS_BANCARIOS.nombre],
                  ["Correo (asunto)", DATOS_BANCARIOS.email],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #EBEBEB" }}>
                    <span style={{ fontSize: 13, color: "#9CA3AF" }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* Subir comprobante */}
              <div style={{ border: "2px dashed #E0E0E0", borderRadius: 10, padding: "20px", textAlign: "center", color: "#9CA3AF" }}>
                <Icon name="upload" size={24} color="#D1D5DB" />
                <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: "#6B7280" }}>Subir comprobante de transferencia</div>
                <div style={{ fontSize: 11, marginTop: 4 }}>JPG, PNG o PDF — Opcional, puedes enviarlo después</div>
                <button style={{ marginTop: 12, background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: 7, padding: "7px 16px", fontSize: 12, cursor: "pointer", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", color: "#374151", fontWeight: 600 }}>
                  Seleccionar archivo
                </button>
              </div>

              <div style={{ marginTop: 16, background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#92400E" }}>
                <strong>Importante:</strong> Tu cuenta será activada una vez que el administrador valide tu pago. Este proceso puede tomar hasta 24 horas hábiles.
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="secondary" onClick={() => setStep(2)}>← Atrás</Btn>
              <Btn variant="success" icon="check" onClick={() => setStep(4)}>Enviar solicitud</Btn>
            </div>
          </div>
        )}

        {/* PASO 4 — Confirmación */}
        {step === 4 && (
          <div style={{ background: "#fff", borderRadius: 16, border: "0.5px solid rgba(0,0,0,.08)", padding: "40px 32px", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, background: "#D1FAE5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Icon name="check" size={28} color="#059669" />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1A1A2E", margin: "0 0 10px" }}>¡Solicitud enviada!</h2>
            <p style={{ color: "#9CA3AF", fontSize: 14, margin: "0 0 8px", lineHeight: 1.6 }}>Tu registro fue recibido correctamente. El equipo de Tempvs7 revisará tu pago y activará tu cuenta en un plazo de 24 horas hábiles.</p>
            <p style={{ color: "#9CA3AF", fontSize: 13, margin: "0 0 28px" }}>Recibirás un correo en <strong style={{ color: "#1A1A2E" }}>{form.email}</strong> cuando tu cuenta esté lista.</p>
            <Btn variant="primary" onClick={onVolver} size="lg" fullWidth>Volver al inicio</Btn>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PANEL ADMIN ──────────────────────────────────────────────────────────────

function PanelAdmin({ onLogout }) {
  const [tabAdmin, setTabAdmin] = useState("solicitudes");
  const [corredoras, setCorredoras] = useState(initCorredoras);
  const [corrDetalleId, setCorrDetalleId] = useState(null);
  const pendientes = corredoras.filter(c => c.estado === "pendiente");
  const activas    = corredoras.filter(c => c.estado === "activa");

  const aprobar = (id) => setCorredoras(prev => prev.map(c => c.id === id ? { ...c, estado: "activa", fechaVenc: "2025-07-15" } : c));
  const rechazar = (id) => setCorredoras(prev => prev.map(c => c.id === id ? { ...c, estado: "rechazada" } : c));

  const navAdmin = [
    { id: "solicitudes", label: "Solicitudes", icon: "alert", badge: pendientes.length },
    { id: "corredoras",  label: "Corredoras",  icon: "building" },
    { id: "planes",      label: "Planes",      icon: "settings" },
  ];

  const corrDetalle = corredoras.find(c => c.id === corrDetalleId);

  return (
    <div style={{ minHeight: "100vh", background: "#F2F2F7", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", display: "flex", flexDirection: "column" }}>

      {/* TOPBAR */}
      <header style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "0.5px solid rgba(0,0,0,.1)", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 17, fontWeight: 600, color: "#1A1A2E", letterSpacing: -0.4 }}>PropManager</span>
          <span style={{ fontSize: 11, color: "#C0C7D0", letterSpacing: 0.3, fontWeight: 400 }}>· Admin</span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {navAdmin.map(item => (
            <button key={item.id} onClick={() => { setTabAdmin(item.id); setCorrDetalleId(null); }}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 13px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", fontSize: 13, fontWeight: tabAdmin === item.id ? 600 : 400, background: tabAdmin === item.id ? "#1A1A2E" : "transparent", color: tabAdmin === item.id ? "#fff" : "#6B7280", position: "relative", transition: "all .15s" }}>
              <Icon name={item.icon} size={14} color={tabAdmin === item.id ? "#fff" : "#9CA3AF"} />
              {item.label}
              {item.badge > 0 && <span style={{ background: "#FF3B30", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 99, padding: "1px 6px", marginLeft: 2 }}>{item.badge}</span>}
            </button>
          ))}
        </div>
        <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: "#9CA3AF", fontSize: 13, fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}>
          <Icon name="logout" size={14} color="currentColor" /> Salir
        </button>
      </header>

      <main style={{ flex: 1, padding: "28px 32px", maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* ── SOLICITUDES ── */}
        {tabAdmin === "solicitudes" && (
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1A1A2E", margin: "0 0 4px" }}>Solicitudes de ingreso</h1>
            <p style={{ color: "#9CA3AF", fontSize: 13, margin: "0 0 24px" }}>{pendientes.length} solicitudes esperando aprobación</p>

            {pendientes.length === 0 && (
              <div style={{ background: "#fff", borderRadius: 16, border: "0.5px solid rgba(0,0,0,.08)", padding: "48px", textAlign: "center", color: "#9CA3AF" }}>
                <Icon name="check" size={36} color="#D1FAE5" />
                <div style={{ marginTop: 12, fontSize: 14 }}>No hay solicitudes pendientes</div>
              </div>
            )}

            {pendientes.map(c => {
              const plan = PLANES.find(p => p.id === c.plan);
              return (
                <div key={c.id} style={{ background: "#fff", borderRadius: 16, border: "0.5px solid rgba(0,0,0,.08)", padding: "20px 24px", marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16, color: "#1A1A2E", marginBottom: 3 }}>{c.empresa}</div>
                      <div style={{ fontSize: 13, color: "#9CA3AF" }}>{c.rut} · {c.email} · {c.telefono}</div>
                    </div>
                    <Badge color="yellow">Pendiente de pago</Badge>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                    <div style={{ background: plan?.bg || "#F3F4F6", borderRadius: 8, padding: "10px 14px" }}>
                      <div style={{ fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>Plan solicitado</div>
                      <div style={{ fontWeight: 700, color: plan?.color || "#1A1A2E" }}>Plan {plan?.nombre} — {plan?.uf} UF/mes</div>
                    </div>
                    <div style={{ background: c.comprobante ? "#F0FDF4" : "#FFF5F5", borderRadius: 8, padding: "10px 14px", border: `1px solid ${c.comprobante ? "#BBF7D0" : "#FECACA"}` }}>
                      <div style={{ fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>Comprobante</div>
                      {c.comprobante
                        ? <div style={{ fontSize: 13, color: "#059669", fontWeight: 600 }}>✓ Comprobante adjunto</div>
                        : <div style={{ fontSize: 13, color: "#DC2626", fontWeight: 600 }}>Sin comprobante aún</div>}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Btn variant="success" icon="check" size="sm" onClick={() => aprobar(c.id)}>Aprobar y activar</Btn>
                    <Btn variant="danger" icon="x" size="sm" onClick={() => rechazar(c.id)}>Rechazar</Btn>
                    <div style={{ flex: 1 }} />
                    <div style={{ fontSize: 12, color: "#9CA3AF" }}>Marcar pago manual:</div>
                    <button style={{ fontSize: 12, background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", color: "#374151" }}>
                      Confirmar transferencia
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── CORREDORAS ── */}
        {tabAdmin === "corredoras" && !corrDetalle && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1A1A2E", margin: "0 0 4px" }}>Corredoras</h1>
                <p style={{ color: "#9CA3AF", fontSize: 13, margin: 0 }}>{corredoras.length} registradas · {activas.length} activas</p>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 16, border: "0.5px solid rgba(0,0,0,.08)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead style={{ background: "#F8F9FA" }}>
                  <tr>
                    {["Empresa", "RUT", "Plan", "Vencimiento", "Estado", ""].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "11px 16px", color: "#9CA3AF", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.3 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {corredoras.map(c => {
                    const plan = PLANES.find(p => p.id === c.plan);
                    const ep = estadoCorrP[c.estado] || { label: c.estado, color: "gray" };
                    return (
                      <tr key={c.id} style={{ borderTop: "1px solid #F0F0F0" }}>
                        <td style={{ padding: "13px 16px" }}>
                          <div style={{ fontWeight: 600, color: "#1A1A2E" }}>{c.empresa}</div>
                          <div style={{ fontSize: 11, color: "#9CA3AF" }}>{c.email}</div>
                        </td>
                        <td style={{ padding: "13px 16px", color: "#6B7280" }}>{c.rut}</td>
                        <td style={{ padding: "13px 16px" }}>
                          <span style={{ fontWeight: 600, color: plan?.color, background: plan?.bg, padding: "3px 10px", borderRadius: 99, fontSize: 12 }}>{plan?.nombre}</span>
                        </td>
                        <td style={{ padding: "13px 16px", color: "#6B7280" }}>{c.fechaVenc || "—"}</td>
                        <td style={{ padding: "13px 16px" }}><Badge color={ep.color}>{ep.label}</Badge></td>
                        <td style={{ padding: "13px 16px" }}>
                          <button onClick={() => setCorrDetalleId(c.id)} style={{ background: "none", border: "1px solid #E0E0E0", borderRadius: 7, padding: "5px 12px", cursor: "pointer", fontSize: 12, color: "#555", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}>Ver detalle</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DETALLE CORREDORA */}
        {tabAdmin === "corredoras" && corrDetalle && (
          <div>
            <button onClick={() => setCorrDetalleId(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: 13, marginBottom: 20, padding: 0, fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}>← Volver a Corredoras</button>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
              <div>
                <div style={{ background: "#fff", borderRadius: 16, border: "0.5px solid rgba(0,0,0,.08)", padding: "24px 28px", marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div>
                      <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1A1A2E", margin: "0 0 4px" }}>{corrDetalle.empresa}</h2>
                      <div style={{ fontSize: 13, color: "#9CA3AF" }}>RUT: {corrDetalle.rut}</div>
                    </div>
                    <Badge color={estadoCorrP[corrDetalle.estado]?.color || "gray"}>{estadoCorrP[corrDetalle.estado]?.label}</Badge>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[["Email", corrDetalle.email], ["Teléfono", corrDetalle.telefono], ["Plan", PLANES.find(p => p.id === corrDetalle.plan)?.nombre], ["Vencimiento", corrDetalle.fechaVenc || "No asignado"]].map(([k, v]) => (
                      <div key={k} style={{ background: "#F8F9FA", borderRadius: 8, padding: "10px 14px" }}>
                        <div style={{ fontSize: 10, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 3 }}>{k}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Módulos habilitados */}
                <div style={{ background: "#fff", borderRadius: 16, border: "0.5px solid rgba(0,0,0,.08)", padding: "20px 24px" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1A1A2E", marginBottom: 14 }}>Módulos habilitados</div>
                  {MODULOS.map(m => (
                    <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F5F5F5" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Icon name={m.icon} size={16} color="#9CA3AF" />
                        <span style={{ fontSize: 13 }}>{m.nombre}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button style={{ width: 28, height: 28, borderRadius: 7, border: "none", cursor: "pointer", background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon name="check" size={13} color="#059669" />
                        </button>
                        <button style={{ width: 28, height: 28, borderRadius: 7, border: "none", cursor: "pointer", background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon name="x" size={13} color="#9CA3AF" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Logo */}
                <div style={{ background: "#fff", borderRadius: 16, border: "0.5px solid rgba(0,0,0,.08)", padding: "18px" }}>
                  <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Logo empresa</div>
                  <div style={{ height: 80, background: "#F8F9FA", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, border: "2px dashed #E5E7EB" }}>
                    {corrDetalle.logo
                      ? <img src={corrDetalle.logo} alt="logo" style={{ maxHeight: 60, maxWidth: "100%" }} />
                      : <div style={{ textAlign: "center", color: "#D1D5DB" }}><Icon name="upload" size={24} color="#D1D5DB" /><div style={{ fontSize: 11, marginTop: 4 }}>Sin logo</div></div>}
                  </div>
                  <button style={{ width: "100%", background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: 8, padding: "8px", fontSize: 12, cursor: "pointer", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", color: "#374151", fontWeight: 600 }}>
                    Subir logo
                  </button>
                </div>

                {/* Cambiar plan */}
                <div style={{ background: "#fff", borderRadius: 16, border: "0.5px solid rgba(0,0,0,.08)", padding: "18px" }}>
                  <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Plan y vencimiento</div>
                  <select style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 13, fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", marginBottom: 10, background: "#fff", color: "#1A1A2E" }}>
                    {PLANES.map(p => <option key={p.id} value={p.id} selected={p.id === corrDetalle.plan}>{p.nombre} — {p.uf} UF</option>)}
                  </select>
                  <Input label="Fecha vencimiento" value={corrDetalle.fechaVenc || ""} onChange={() => {}} type="date" />
                  <Btn fullWidth variant="primary" size="sm">Guardar cambios</Btn>
                </div>

                {/* Acciones */}
                <div style={{ background: "#fff", borderRadius: 16, border: "0.5px solid rgba(0,0,0,.08)", padding: "18px" }}>
                  <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Acciones</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Btn fullWidth variant="secondary" icon="eye" size="sm">Ver portal corredora</Btn>
                    <Btn fullWidth variant="danger" icon="x" size="sm">Suspender acceso</Btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PLANES ── */}
        {tabAdmin === "planes" && (
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1A1A2E", margin: "0 0 4px" }}>Gestión de planes</h1>
            <p style={{ color: "#9CA3AF", fontSize: 13, margin: "0 0 24px" }}>Configura los planes y módulos disponibles</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
              {PLANES.map(plan => (
                <div key={plan.id} style={{ background: "#fff", borderRadius: 16, border: `1.5px solid ${plan.color}33`, padding: "20px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16, color: plan.color }}>{plan.nombre}</div>
                      <div style={{ fontSize: 13, color: "#9CA3AF" }}>{plan.propiedades === 9999 ? "Ilimitadas" : `Hasta ${plan.propiedades} propiedades`}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 22, fontWeight: 900, color: "#1A1A2E" }}>{plan.uf} UF</div>
                      <div style={{ fontSize: 12, color: "#9CA3AF" }}>≈ {fmt(plan.pesos)}/mes</div>
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid #F0F0F0", paddingTop: 12 }}>
                    <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 10 }}>Módulos incluidos</div>
                    {MODULOS.map(m => (
                      <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0" }}>
                        <Icon name="check" size={13} color="#059669" />
                        <span style={{ fontSize: 12, color: "#555" }}>{m.nombre}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <Btn variant="secondary" size="sm" icon="settings" fullWidth>Editar plan</Btn>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── PORTAL CORREDORA ─────────────────────────────────────────────────────────

function PortalCorredora({ usuario, onLogout }) {
  const corredora = initCorredoras.find(c => c.id === usuario.corrodoraId) || initCorredoras[0];
  const plan = PLANES.find(p => p.id === corredora.plan);
  const [tab, setTab] = useState("dashboard");
  const [propiedadDetalle, setPropiedadDetalle] = useState(null);
  const [arrendatarioDetalle, setArrendatarioDetalle] = useState(null);
  const [revisionPropId, setRevisionPropId] = useState(null);
  const [checklist, setChecklist] = useState({});
  const [notasRevision, setNotasRevision] = useState("");
  const [revisionGuardada, setRevisionGuardada] = useState(false);

  const navItems = [
    { id: "dashboard",     label: "Dashboard",    icon: "chart" },
    { id: "propiedades",   label: "Propiedades",  icon: "home" },
    { id: "arrendatarios", label: "Arrendatarios",icon: "users" },
    { id: "inventario",    label: "Inventario",   icon: "camera" },
    { id: "revision",      label: "Revisión",     icon: "clipboard" },
  ];

  const totalArriendos   = propiedades.filter(p => p.estado === "arrendado").length;
  const totalDisponibles = propiedades.filter(p => p.estado === "disponible").length;
  const ingresoMensual   = arrendatarios.reduce((s, a) => s + a.valorMensual, 0);
  const morosos          = arrendatarios.filter(a => a.estadoPago === "moroso").length;
  const montoPendiente   = pagos.filter(p => p.estado !== "pagado").reduce((s, p) => s + p.monto, 0);

  const categorias = [...new Set(revisionItems.map(i => i.categoria))];
  const checkCount = Object.values(checklist).filter(v => v === "ok").length;
  const toggleCheck = (id, val) => setChecklist(prev => ({ ...prev, [id]: val }));
  const revisionPropiedad = propiedades.find(p => p.id === revisionPropId);

  // Alerta de vencimiento
  const diasVenc = corredora.fechaVenc ? Math.ceil((new Date(corredora.fechaVenc) - new Date()) / 86400000) : null;
  const alertaVenc = diasVenc !== null && diasVenc <= 7;

  return (
    <div style={{ minHeight: "100vh", background: "#F2F2F7", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ALERTA VENCIMIENTO */}
      {alertaVenc && (
        <div style={{ background: diasVenc <= 0 ? "#FEF2F2" : "#FFFBEB", borderBottom: `1px solid ${diasVenc <= 0 ? "#FECACA" : "#FDE68A"}`, padding: "10px 28px", display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="alert" size={16} color={diasVenc <= 0 ? "#DC2626" : "#D97706"} />
          <span style={{ fontSize: 13, color: diasVenc <= 0 ? "#991B1B" : "#92400E", fontWeight: 600 }}>
            {diasVenc <= 0 ? `Tu plan venció hace ${Math.abs(diasVenc)} día(s). Tienes ${5 + diasVenc} día(s) de gracia antes del bloqueo.` : `Tu plan vence el ${corredora.fechaVenc}. Renueva para no perder el acceso.`}
          </span>
          <button style={{ marginLeft: "auto", background: diasVenc <= 0 ? "#DC2626" : "#D97706", color: "#fff", border: "none", borderRadius: 7, padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}>
            Renovar ahora
          </button>
        </div>
      )}

      {/* TOPBAR */}
      <header style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "0.5px solid rgba(0,0,0,.1)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52, position: "sticky", top: alertaVenc ? 44 : 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 160 }}>
          <span style={{ fontSize: 17, fontWeight: 600, color: "#1A1A2E", letterSpacing: -0.4 }}>PropManager</span>
          <span style={{ fontSize: 11, color: "#C0C7D0", letterSpacing: 0.3 }}>· {corredora.empresa}</span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setTab(item.id); setPropiedadDetalle(null); setArrendatarioDetalle(null); setRevisionPropId(null); setRevisionGuardada(false); }}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", fontSize: 13, fontWeight: tab === item.id ? 600 : 400, background: tab === item.id ? "#1A1A2E" : "transparent", color: tab === item.id ? "#fff" : "#6B7280", transition: "all .15s" }}>
              <Icon name={item.icon} size={14} color={tab === item.id ? "#fff" : "#9CA3AF"} />
              {item.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 160, justifyContent: "flex-end" }}>
          <span style={{ fontSize: 11, background: plan?.bg, color: plan?.color, padding: "3px 10px", borderRadius: 99, fontWeight: 600 }}>Plan {plan?.nombre}</span>
          <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "#9CA3AF", fontSize: 13, fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}>
            <Icon name="logout" size={14} color="currentColor" /> Salir
          </button>
        </div>
      </header>

      <main style={{ flex: 1, padding: "28px 32px", maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1A1A2E", margin: "0 0 4px" }}>Resumen General</h1>
            <p style={{ color: "#9CA3AF", fontSize: 13, margin: "0 0 24px" }}>Junio 2025 · {propiedades.length} propiedades administradas</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
              {[
                { label: "Ingresos Mensuales", value: fmt(ingresoMensual), sub: "arriendos vigentes", color: "#1A1A2E" },
                { label: "Arrendadas",          value: totalArriendos,      sub: `de ${propiedades.length} propiedades`, color: "#059669" },
                { label: "Disponibles",          value: totalDisponibles,    sub: "para arrendar", color: "#2563EB" },
                { label: "Saldo Pendiente",      value: fmt(montoPendiente), sub: `${morosos} moroso(s)`, color: "#DC2626" },
              ].map((kpi, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", border: "0.5px solid rgba(0,0,0,.08)" }}>
                  <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{kpi.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: kpi.color, letterSpacing: -0.5, marginBottom: 2 }}>{kpi.value}</div>
                  <div style={{ fontSize: 11, color: "#D1D5DB" }}>{kpi.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
              <div style={{ background: "#fff", borderRadius: 14, padding: "20px 22px", border: "0.5px solid rgba(0,0,0,.08)" }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#1A1A2E", marginBottom: 14 }}>Estado de Pagos</div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead><tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                    {["Arrendatario", "Mes", "Monto", "Estado"].map(h => <th key={h} style={{ textAlign: "left", padding: "6px 8px", color: "#9CA3AF", fontWeight: 600, fontSize: 11, textTransform: "uppercase" }}>{h}</th>)}
                  </tr></thead>
                  <tbody>{pagos.map(p => {
                    const arr = arrendatarios.find(a => a.id === p.arrendatarioId);
                    const ep = estadoPagoP[p.estado];
                    return (<tr key={p.id} style={{ borderBottom: "1px solid #F7F7F7" }}>
                      <td style={{ padding: "9px 8px", fontWeight: 500 }}>{arr?.nombre}</td>
                      <td style={{ padding: "9px 8px", color: "#9CA3AF" }}>{p.mes}</td>
                      <td style={{ padding: "9px 8px", fontWeight: 600 }}>{fmt(p.monto)}</td>
                      <td style={{ padding: "9px 8px" }}><Badge color={ep.color}>{ep.label}</Badge></td>
                    </tr>);
                  })}</tbody>
                </table>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", border: "0.5px solid rgba(0,0,0,.08)" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1A1A2E", marginBottom: 12 }}>Alertas</div>
                  {arrendatarios.filter(a => a.estadoPago === "moroso").map(a => (
                    <div key={a.id} style={{ display: "flex", gap: 8, padding: "9px 10px", background: "#FFF5F5", borderRadius: 8, marginBottom: 8, border: "1px solid #FECACA" }}>
                      <Icon name="alert" size={14} color="#DC2626" />
                      <div><div style={{ fontSize: 12, fontWeight: 600, color: "#991B1B" }}>{a.nombre}</div><div style={{ fontSize: 11, color: "#DC2626" }}>Pagos vencidos</div></div>
                    </div>
                  ))}
                  {propiedades.filter(p => p.estado === "revision").map(p => (
                    <div key={p.id} style={{ display: "flex", gap: 8, padding: "9px 10px", background: "#FFFBEB", borderRadius: 8, border: "1px solid #FDE68A" }}>
                      <Icon name="clipboard" size={14} color="#D97706" />
                      <div><div style={{ fontSize: 12, fontWeight: 600, color: "#92400E" }}>{p.nombre}</div><div style={{ fontSize: 11, color: "#D97706" }}>Pendiente revisión</div></div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", border: "0.5px solid rgba(0,0,0,.08)" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1A1A2E", marginBottom: 10 }}>Mi Plan</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: plan?.color }}>Plan {plan?.nombre}</div>
                  <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 8 }}>{plan?.uf} UF/mes · Hasta {plan?.propiedades === 9999 ? "∞" : plan?.propiedades} propiedades</div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>Vence: {corredora.fechaVenc}</div>
                  <div style={{ marginTop: 8, fontSize: 12, color: "#059669", fontWeight: 600 }}>
                    {propiedades.length}/{plan?.propiedades === 9999 ? "∞" : plan?.propiedades} propiedades usadas
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROPIEDADES */}
        {tab === "propiedades" && !propiedadDetalle && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1A1A2E", margin: 0 }}>Propiedades</h1>
                <p style={{ color: "#9CA3AF", fontSize: 13, margin: "3px 0 0" }}>{propiedades.length} inmuebles</p>
              </div>
              <Btn variant="primary" icon="plus" size="sm">Nueva Propiedad</Btn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
              {propiedades.map(p => {
                const ep = estadoProps[p.estado];
                const arr = arrendatarios.find(a => a.propiedadId === p.id);
                return (
                  <div key={p.id} onClick={() => setPropiedadDetalle(p)} style={{ background: "#fff", borderRadius: 14, border: "0.5px solid rgba(0,0,0,.08)", cursor: "pointer", overflow: "hidden" }}>
                    <div style={{ height: 100, background: "linear-gradient(135deg,#1A1A2E,#2D3561)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <Icon name="home" size={32} color="rgba(200,169,110,.25)" />
                      <div style={{ position: "absolute", top: 10, left: 10 }}><Badge color={ep.color}>{ep.label}</Badge></div>
                      <div style={{ position: "absolute", top: 10, right: 10, fontSize: 11, color: "rgba(255,255,255,.4)" }}>{p.codigo}</div>
                    </div>
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "#1A1A2E", marginBottom: 2 }}>{p.nombre}</div>
                      <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 10 }}>{p.direccion}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 800, fontSize: 15, color: "#1A1A2E" }}>{fmt(p.valorArriendo)}<span style={{ fontSize: 11, fontWeight: 400, color: "#D1D5DB" }}>/mes</span></span>
                        {arr && <span style={{ fontSize: 11, color: "#9CA3AF" }}>{arr.nombre}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "propiedades" && propiedadDetalle && (
          <div>
            <button onClick={() => setPropiedadDetalle(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: 13, marginBottom: 18, padding: 0, fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}>← Volver</button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 18 }}>
              <div style={{ background: "#fff", borderRadius: 14, border: "0.5px solid rgba(0,0,0,.08)", overflow: "hidden" }}>
                <div style={{ height: 160, background: "linear-gradient(135deg,#1A1A2E,#2D3561)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="home" size={48} color="rgba(200,169,110,.2)" />
                </div>
                <div style={{ padding: "22px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1A1A2E", margin: 0 }}>{propiedadDetalle.nombre}</h2>
                    <Badge color={estadoProps[propiedadDetalle.estado].color}>{estadoProps[propiedadDetalle.estado].label}</Badge>
                  </div>
                  <p style={{ color: "#9CA3AF", fontSize: 13, margin: "0 0 18px" }}>{propiedadDetalle.direccion}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                    {[["Superficie", `${propiedadDetalle.m2} m²`], ["Habitaciones", propiedadDetalle.habitaciones || "—"], ["Baños", propiedadDetalle.banos], ["Estac.", propiedadDetalle.estacionamiento ? "Sí" : "No"]].map(([l, v]) => (
                      <div key={l} style={{ textAlign: "center", padding: "10px", background: "#F8F9FA", borderRadius: 8 }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: "#1A1A2E" }}>{v}</div>
                        <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ background: "#fff", borderRadius: 14, padding: "18px", border: "0.5px solid rgba(0,0,0,.08)" }}>
                  <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Valor Arriendo</div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: "#1A1A2E" }}>{fmt(propiedadDetalle.valorArriendo)}</div>
                </div>
                <div style={{ background: "#fff", borderRadius: 14, padding: "18px", border: "0.5px solid rgba(0,0,0,.08)" }}>
                  <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", marginBottom: 10 }}>Propietario</div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{propiedadDetalle.propietario}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>{propiedadDetalle.propietarioTel}</div>
                </div>
                <button onClick={() => { setTab("inventario"); }} style={{ background: "#1A1A2E", color: "#fff", border: "none", padding: "11px", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Icon name="camera" size={15} color="#C8A96E" /> Iniciar Inventario
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ARRENDATARIOS */}
        {tab === "arrendatarios" && !arrendatarioDetalle && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1A1A2E", margin: 0 }}>Arrendatarios</h1>
                <p style={{ color: "#9CA3AF", fontSize: 13, margin: "3px 0 0" }}>{arrendatarios.length} contratos vigentes</p>
              </div>
              <Btn variant="primary" icon="plus" size="sm">Nuevo Contrato</Btn>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, border: "0.5px solid rgba(0,0,0,.08)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead style={{ background: "#F8F9FA" }}>
                  <tr>{["Arrendatario", "Propiedad", "Valor Mensual", "Término", "Estado", ""].map(h => <th key={h} style={{ textAlign: "left", padding: "11px 16px", color: "#9CA3AF", fontWeight: 600, fontSize: 11, textTransform: "uppercase" }}>{h}</th>)}</tr>
                </thead>
                <tbody>{arrendatarios.map(a => {
                  const prop = propiedades.find(p => p.id === a.propiedadId);
                  const ep = { al_dia: { label: "Al día", color: "green" }, moroso: { label: "Moroso", color: "red" } }[a.estadoPago];
                  return (
                    <tr key={a.id} style={{ borderTop: "1px solid #F0F0F0" }}>
                      <td style={{ padding: "12px 16px" }}><div style={{ fontWeight: 600 }}>{a.nombre}</div><div style={{ fontSize: 11, color: "#9CA3AF" }}>{a.email}</div></td>
                      <td style={{ padding: "12px 16px", color: "#6B7280" }}>{prop?.nombre}</td>
                      <td style={{ padding: "12px 16px", fontWeight: 700 }}>{fmt(a.valorMensual)}</td>
                      <td style={{ padding: "12px 16px", color: "#6B7280" }}>{a.finContrato}</td>
                      <td style={{ padding: "12px 16px" }}><Badge color={ep.color}>{ep.label}</Badge></td>
                      <td style={{ padding: "12px 16px" }}><button onClick={() => setArrendatarioDetalle(a)} style={{ background: "none", border: "1px solid #E0E0E0", borderRadius: 7, padding: "5px 12px", cursor: "pointer", fontSize: 12, color: "#555", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}>Ver</button></td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* INVENTARIO — placeholder */}
        {tab === "inventario" && (
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1A1A2E", margin: "0 0 4px" }}>Inventario de Propiedades</h1>
            <p style={{ color: "#9CA3AF", fontSize: 13, margin: "0 0 24px" }}>Actas de entrada y salida con registro fotográfico</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
              {propiedades.map(p => (
                <div key={p.id} style={{ background: "#fff", borderRadius: 14, border: "0.5px solid rgba(0,0,0,.08)", padding: "18px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
                  <div style={{ width: 44, height: 44, background: "#1A1A2E", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="camera" size={20} color="#C8A96E" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#1A1A2E" }}>{p.nombre}</div>
                    <div style={{ fontSize: 12, color: "#9CA3AF" }}>{p.comuna}</div>
                  </div>
                  <div style={{ display: "flex", flex: "column", gap: 6, flexDirection: "column" }}>
                    <button style={{ background: "#E8F5EE", color: "#059669", border: "none", borderRadius: 7, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}>Acta Entrada</button>
                    <button style={{ background: "#FEF2F2", color: "#DC2626", border: "none", borderRadius: 7, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}>Acta Salida</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REVISION */}
        {tab === "revision" && !revisionPropId && (
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1A1A2E", margin: "0 0 4px" }}>Revisión de Estado</h1>
            <p style={{ color: "#9CA3AF", fontSize: 13, margin: "0 0 24px" }}>Selecciona una propiedad para iniciar la inspección</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
              {propiedades.map(p => (
                <div key={p.id} onClick={() => { setRevisionPropId(p.id); setChecklist({}); setNotasRevision(""); setRevisionGuardada(false); }}
                  style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", border: "0.5px solid rgba(0,0,0,.08)", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, background: "#1A1A2E", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="home" size={20} color="#C8A96E" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#1A1A2E" }}>{p.nombre}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 4 }}>{p.comuna}</div>
                    <Badge color={estadoProps[p.estado].color}>{estadoProps[p.estado].label}</Badge>
                  </div>
                  <Icon name="arrow" size={16} color="#D1D5DB" />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "revision" && revisionPropId && (
          <div>
            <button onClick={() => setRevisionPropId(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: 13, marginBottom: 18, padding: 0, fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}>← Volver</button>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h1 style={{ fontSize: 18, fontWeight: 800, color: "#1A1A2E", margin: 0 }}>Revisión: {revisionPropiedad?.nombre}</h1>
                <p style={{ color: "#9CA3AF", fontSize: 12, margin: "3px 0 0" }}>{revisionPropiedad?.direccion}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: checkCount === revisionItems.length ? "#059669" : "#1A1A2E" }}>{checkCount}<span style={{ fontSize: 13, color: "#D1D5DB", fontWeight: 400 }}>/{revisionItems.length}</span></div>
              </div>
            </div>
            <div style={{ height: 5, background: "#F0F0F0", borderRadius: 3, marginBottom: 24 }}>
              <div style={{ height: 5, background: "#1A1A2E", borderRadius: 3, width: `${(checkCount / revisionItems.length) * 100}%`, transition: "width .3s" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 18 }}>
              <div>
                {categorias.map(cat => (
                  <div key={cat} style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", border: "0.5px solid rgba(0,0,0,.08)", marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 12, color: "#1A1A2E", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>{cat}</div>
                    {revisionItems.filter(i => i.categoria === cat).map(item => {
                      const val = checklist[item.id];
                      return (
                        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #F5F5F5" }}>
                          <span style={{ fontSize: 13, color: "#374151" }}>{item.label}</span>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button onClick={() => toggleCheck(item.id, "ok")} style={{ width: 30, height: 30, borderRadius: 7, border: "none", cursor: "pointer", background: val === "ok" ? "#059669" : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Icon name="check" size={13} color={val === "ok" ? "#fff" : "#9CA3AF"} />
                            </button>
                            <button onClick={() => toggleCheck(item.id, "malo")} style={{ width: 30, height: 30, borderRadius: 7, border: "none", cursor: "pointer", background: val === "malo" ? "#DC2626" : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Icon name="x" size={13} color={val === "malo" ? "#fff" : "#9CA3AF"} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ background: "#fff", borderRadius: 14, padding: "18px", border: "0.5px solid rgba(0,0,0,.08)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1A1A2E", marginBottom: 12 }}>Resumen</div>
                  {[{ label: "Sin revisar", count: revisionItems.length - Object.keys(checklist).length, color: "#D1D5DB" }, { label: "En buen estado", count: Object.values(checklist).filter(v => v === "ok").length, color: "#059669" }, { label: "Con problemas", count: Object.values(checklist).filter(v => v === "malo").length, color: "#DC2626" }].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #F5F5F5" }}>
                      <span style={{ fontSize: 13, color: "#6B7280" }}>{r.label}</span>
                      <span style={{ fontWeight: 800, fontSize: 15, color: r.color }}>{r.count}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#fff", borderRadius: 14, padding: "18px", border: "0.5px solid rgba(0,0,0,.08)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1A1A2E", marginBottom: 8 }}>Observaciones</div>
                  <textarea value={notasRevision} onChange={e => setNotasRevision(e.target.value)} placeholder="Notas adicionales..." style={{ width: "100%", height: 100, borderRadius: 8, border: "1px solid #E5E7EB", padding: "9px 11px", fontSize: 12, fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", resize: "vertical", outline: "none", boxSizing: "border-box" }} />
                </div>
                {revisionGuardada && <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#065F46", fontWeight: 600, display: "flex", gap: 8 }}><Icon name="check" size={14} color="#059669" /> Revisión guardada</div>}
                <button onClick={() => setRevisionGuardada(true)} style={{ background: "#1A1A2E", color: "#fff", border: "none", padding: "13px", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}>
                  Guardar Revisión
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [pantalla, setPantalla] = useState("login"); // login | registro | portal
  const [usuario, setUsuario] = useState(null);

  const handleLogin = (u) => { setUsuario(u); setPantalla("portal"); };
  const handleLogout = () => { setUsuario(null); setPantalla("login"); };

  if (pantalla === "login")   return <LoginScreen onLogin={handleLogin} onRegistro={() => setPantalla("registro")} />;
  if (pantalla === "registro") return <RegistroScreen onVolver={() => setPantalla("login")} />;
  if (pantalla === "portal" && usuario?.rol === "admin")     return <PanelAdmin onLogout={handleLogout} />;
  if (pantalla === "portal" && usuario?.rol === "corredora") return <PortalCorredora usuario={usuario} onLogout={handleLogout} />;
  return null;
}
