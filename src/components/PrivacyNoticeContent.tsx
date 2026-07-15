// Single source of truth for the aviso de privacidad copy. Rendered both by
// the standalone /aviso-de-privacidad page and by the modal on the contact
// step, so the two can never drift.
//
// Starting draft only -- not reviewed by counsel. Confirm the
// responsible-party details and contact email before launch.
export function PrivacyNoticeContent() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-neutral-700">
      <p>
        Habitanza ("nosotros") es responsable del tratamiento de tus datos personales conforme a la Ley Federal de
        Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
      </p>
      <p>
        <strong>Datos que recabamos:</strong> nombre, teléfono/WhatsApp, fraccionamiento o colonia, tipo de propiedad
        y, de forma opcional, metros de construcción, número de recámaras e intención de venta.
      </p>
      <p>
        <strong>Finalidad:</strong> contactarte por WhatsApp para compartirte una estimación del valor de tu propiedad
        y, si así lo decides, brindarte asesoría inmobiliaria.
      </p>
      <p>
        <strong>Transferencia:</strong> tus datos no se comparten con terceros ajenos a Habitanza, salvo obligación
        legal.
      </p>
      <p>
        <strong>Derechos ARCO:</strong> puedes solicitar acceso, rectificación, cancelación u oposición al tratamiento
        de tus datos escribiendo a privacidad@habitanza.com.
      </p>
      <p>Este aviso puede actualizarse; la versión vigente estará siempre disponible en esta página.</p>
    </div>
  );
}
