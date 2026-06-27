import type { LegalDoc } from "./types"

export const privacidadDoc: LegalDoc = {
  title: "Política de Privacidad",
  updated: "Junio de 2026",
  intro:
    "En la Juventud Mariana Vicenciana de República Dominicana (JMV-RD) valoramos y respetamos tu privacidad. Esta política explica qué datos personales recogemos a través de este sitio web, con qué finalidad los usamos y cuáles son tus derechos.",
  sections: [
    {
      title: "1. Responsable",
      blocks: [
        {
          type: "p",
          text: "El responsable del tratamiento de tus datos es la Juventud Mariana Vicenciana de República Dominicana (JMV-RD). Para cualquier asunto relacionado con tus datos puedes escribirnos a info@jmvrd.org.",
        },
      ],
    },
    {
      title: "2. Qué datos recogemos",
      blocks: [
        { type: "p", text: "Solo tratamos los datos que tú mismo nos facilitas a través del sitio:" },
        {
          type: "list",
          items: [
            "Formulario «Únete»: nombre, apellidos, correo electrónico, teléfono, edad, provincia, parroquia y el motivo por el que deseas unirte.",
            "Testimonios: el nombre, la parroquia o comunidad y el mensaje que decidas compartir.",
            "Consultas: los datos de contacto que nos envíes al comunicarte con nosotros.",
          ],
        },
        {
          type: "p",
          text: "Además, el sitio utiliza cookies técnicas necesarias para su correcto funcionamiento y para el acceso al área de administración. No utilizamos cookies con fines publicitarios.",
        },
      ],
    },
    {
      title: "3. Para qué usamos tus datos",
      blocks: [
        {
          type: "list",
          items: [
            "Atender tu solicitud de unirte a JMV y ponerte en contacto con el centro más cercano.",
            "Publicar, con tu consentimiento, los testimonios que nos envíes.",
            "Responder a tus consultas y mantener la comunicación contigo.",
            "Gestionar y mejorar el funcionamiento del sitio.",
          ],
        },
      ],
    },
    {
      title: "4. Consentimiento",
      blocks: [
        {
          type: "p",
          text: "Tratamos tus datos con base en el consentimiento que nos otorgas al enviarnos la información. Puedes retirar ese consentimiento en cualquier momento escribiéndonos a info@jmvrd.org.",
        },
      ],
    },
    {
      title: "5. Con quién compartimos tus datos",
      blocks: [
        {
          type: "p",
          text: "No vendemos ni cedemos tus datos a terceros con fines comerciales. Tu información se comparte únicamente, y de forma interna, con los coordinadores o responsables del centro JMV que corresponda para poder atender tu solicitud, o cuando una autoridad competente lo exija conforme a la ley.",
        },
      ],
    },
    {
      title: "6. Conservación",
      blocks: [
        {
          type: "p",
          text: "Conservamos tus datos durante el tiempo necesario para cumplir la finalidad para la que los recogimos. Cuando dejen de ser necesarios, los eliminamos o los anonimizamos.",
        },
      ],
    },
    {
      title: "7. Tus derechos",
      blocks: [
        {
          type: "p",
          text: "Puedes solicitar en cualquier momento acceder a tus datos, corregirlos o eliminarlos, así como oponerte a su tratamiento. Para ejercer estos derechos escríbenos a info@jmvrd.org.",
        },
      ],
    },
    {
      title: "8. Menores de edad",
      blocks: [
        {
          type: "p",
          text: "JMV acompaña también a niños, pre-juveniles y adolescentes. Cuando un menor de edad nos facilite sus datos, debe contar con el conocimiento y la autorización de su padre, madre o tutor. Si eres padre, madre o tutor y crees que un menor nos ha facilitado datos sin tu autorización, contáctanos para retirarlos.",
        },
      ],
    },
    {
      title: "9. Seguridad",
      blocks: [
        {
          type: "p",
          text: "Aplicamos medidas razonables para proteger tus datos frente a accesos no autorizados, pérdida o uso indebido. Aun así, ningún sistema es completamente infalible, por lo que no podemos garantizar una seguridad absoluta.",
        },
      ],
    },
    {
      title: "10. Cambios en esta política",
      blocks: [
        {
          type: "p",
          text: "Podemos actualizar esta política para reflejar cambios en nuestras prácticas o en la normativa aplicable. Publicaremos siempre la versión vigente en esta misma página, indicando la fecha de la última actualización.",
        },
      ],
    },
    {
      title: "11. Contacto",
      blocks: [
        {
          type: "p",
          text: "Si tienes cualquier duda sobre esta política o sobre el tratamiento de tus datos, escríbenos a info@jmvrd.org.",
        },
      ],
    },
  ],
}
