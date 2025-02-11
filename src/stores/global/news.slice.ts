import { StateCreator } from "zustand";
import { New } from "../../types/new.type";
import NewsService from "../../lib/services/news.sevice";

export interface NewsState {
  news: New[] | [];
  newsPatio: New[] | [];
  newDetail: New | null;
  newPatio: New | null;
  draftDetail: New | null;
  loadingNews: boolean;
  loadingDrafts: boolean;
  newsLoaded: boolean;
  newsPatioLoaded: boolean;
  draftLoaded: boolean;
  errorNews: boolean;
  totalPages: number;
  currentPage: number;
}

export interface NewsActions {
  resetCargaDatosState: () => void;
  getAllNews: (page?: number, limit?: number, title?: string, category?: string) => void;
  getNewById: (id: string) => void;
  getDraftById: (id: string) => void;
  setCurrentPage: (page: number) => void;
  getAllNewsPatio: (page: number, limit: number, title?: string) => void;
  getNewPatioById: (id: string) => void;
}

export type NewsSlice = NewsState & NewsActions;

const initialState: NewsState = {
  news: [
    //     {
    //       _id: "676d3811c8d3d76aa6b8ce73",
    //       title: "Miguel “Gato” Marin – Depor3 | Río Tercero",
    //       category: "Patio del deportista",
    //       description:
    //         "José Miguel Marín Accotto nació en Rio Tercero un 15 de mayo del año 1945, en una modesta casa de la calle Jerónimo Luis de Cabrera al 70. Desde niño demostró, en los campitos del popular barrio Castagnino...",
    //       body: '<div>\r\n<article>\n\t<div>\n<p>José Miguel Marín Accotto nació en Rio Tercero un 15 de mayo del año 1945, en una modesta casa de la calle Jerónimo Luis de Cabrera al 70. Desde niño demostró, en los campitos del popular barrio Castagnino cuando aún se llamaba barrio Presidente Perón Sud, sus aptitudes como arquero.</p>\n<p>No hay registros oficiales que haya jugado en algún club de Rio Tercero, ya que cuando tenía 14 años su familia se radicó en Rosario, sin embargo su debut a los 19 años en la Primera División del Club Atlético Vélez Sarsfield, un 9 de agosto de 1964, fue una noticia festejada con mucha alegría por la gente del pueblo , que lo conocía de niño. Una lesión del arquero titular Rogelio Domínguez abrió la puerta para que<strong> </strong>Juan José Ferraro, a cargo de la dirección técnica, le diera la posiblidad de sustituirlo, en un partido donde Velez le ganó a Huracán por 3 a  2 y con un muy buen desempeño del “Gato”.<br />Después de Esteban “mono” Ravetti que había brillado en el fútbol grande de Córdoba, Rio Tercero tenía su primer ídolo en el fútbol grande del país. A pocos meses de su debut en 1ra división integró la delegación argentina que participó en los Juegos Olímpicos de Tokio en 1964, convirtiendose en el primer deportista olímpico de Rio Tercero. En Tokio fue el arquero suplente del recordado Agustín Cejas en la selección Nacional de fútbol.   </p>\n<p>Afianzado como arquero titular en Vélez, “El Gato” Marín se consagró campeón con “El Fortín” en el Torneo Nacional de 1968 y subcampeón del Torneo Metropolitano de 1971. En total disputó 225 cotejos defendiendo al equipo de Liniers entre 1964 y 1971.</p>\n<p>Entre 1967 y 1971 jugó sus únicos 5 encuentros para la Selección Nacional, en los que le convirtieron 8 goles. La sorpresiva eliminación argentina le impidió viajar al Mundial de México 1970. </p>\n<figure>\n<figure><img src="https://depor3.com/wp-content/uploads/2024/12/Miguel-Gato-Marin.jpg" alt="" srcset="https://depor3.com/wp-content/uploads/2024/12/Miguel-Gato-Marin.jpg 592w, https://depor3.com/wp-content/uploads/2024/12/Miguel-Gato-Marin-300x203.jpg 300w" /></figure>\n<figure><img src="https://depor3.com/wp-content/uploads/2024/12/Marin-Gato.gif" alt="" /></figure>\n</figure>\n<p><br />En el año 1971 fue transferido al club Mexicano Cruz Azul. Las actuaciones de Marín poco a poco lo convirtieron en una de las figuras destacadas de este equipo y del fútbol mexicano, donde debido a la espectacularidad de sus atajadas se ganó el sobrenombre de “Superman”.</p>\n<p>La brillante trayectoria de Marín en México, lo convirtió el guardameta más eficaz de la historia, ya que de 309 partidos de Liga y Liguilla que disputó apenas le pudieron hacer 298 goles, con un promedio de menos de un gol por partido.<br />Fue 5 veces “Campeón de Liga” con Cruz Azul 71/72 – 72/73 – 73/74 – 78/79 – 79/80, completando cinco estrellas de las 8 estrellas del escudo del club. Fue también Campeón de Campeones en la temporada 73/74, y recibió las distinciones de “Mejor arquero del año” en las temporadas 78-79 y 79-80, además de “Mejor jugador del año” en la temporada 79-80 durante los torneos largos.<br />La sencillez, el carisma y sus enormes dotes de líder lo convirtieron en el ídolo de los niños mexicanos de aquellos años.<br />Durante una entrevista a los medios deportivos mexicanos reveló las consecuencias del atajar tantos “bombazos” al quitarse los guantes y dejar ver unas manos deformadas, aseverando: “Son pelotazos de la vida”.<br />En 1982 comenzó su carrera como entrenador al ser designado como Director Técnico del Cruz Azul, para luego pasar por Los Coyotes de Neza.<br />Dentro de la Selección Nacional Mexicana desempeñaría un papel clave, al convertirse en entrenador de guardametas durante la era de Bora Milutinović, en el mundial de México 1986.</p>\n<figure>\n<figure><img src="https://depor3.com/wp-content/uploads/2024/12/Manos-del-gato-Marin.jpg" alt="" srcset="https://depor3.com/wp-content/uploads/2024/12/Manos-del-gato-Marin.jpg 304w, https://depor3.com/wp-content/uploads/2024/12/Manos-del-gato-Marin-300x164.jpg 300w" /></figure>\n<figure><img src="https://depor3.com/wp-content/uploads/2024/12/Marin-volando-1.jpg" alt="" srcset="https://depor3.com/wp-content/uploads/2024/12/Marin-volando-1.jpg 500w, https://depor3.com/wp-content/uploads/2024/12/Marin-volando-1-300x188.jpg 300w" /></figure>\n</figure>\n<p><br />Fue precisamente al desempeñar el puesto de entrenador del equipo de la Universidad de Querétaro, cuando se encontraba en actividades y sufrió un infarto fulminante al corazón, que le provocó la muerte, el 30 de diciembre de 1991.<br />Miguel Marín “Superman” el “insuperable” se convirtió en leyenda, que con el paso del tiempo ha permanecido y se ha agigantado en la historia del “Cruz Azul” y el fútbol mexicano. Los riotercerenses tienen el orgullo de que fue un nativo de estas tierras, y su figura contribuyó a la designación de ciudad Capital Nacional del deportista.</p>\n\t</div>\n\t</article>\n\t\t\t</div>',
    //     },
    //     {
    //       _id: "123",
    //       title: "Los niños tendrán su Escuela Deportiva Recreativa de Verano",
    //       description: "",
    //       category: "Política deportiva",
    //       author: "Depor3",
    //       body: `Desde la Municipalidad de Río Tercero informaron que están abiertas las inscripciones para la Escuela Deportiva Recreativa de Verano para niños y niñas de 6 a 12 años de toda la ciudad.
    //           La iniciativa se llevará a cabo en la pileta del Club Atlético Río Tercero, con una primera etapa que irá del 6 al 24 de enero y para inscribirse es necesario ingresar al link: https://rio3.ar/Verano25PrimerEtapa`,
    //       image:
    //         "https://depor3.com/wp-content/uploads/2022/12/Verano-2-800x445.jpg",
    //       date: "17/12/2024",
    //       active: true,
    //     },
    //     {
    //       _id: "123",
    //       title: "Marcelo Ciarrocchi terminó séptimo en el campeonato de TC2000 ",
    //       description: "",
    //       category: "Automovilismo",
    //       author: "Depor3",
    //       body: `La ciudad entrerriana de Concordia, albergó este fin de semana, el “Gran Premio Coronación” de la 12ª fecha del 45⁰ Campeonato Argentino de TC200, donde el piloto almafuertense Marcelo Ciarrocchi logro meterse en el “top ten”, además de conseguir la “pole position” en la clasificación.
    //       El día sábado, con su Toyota Corolla fue el mejor de la clasificación y por única vez en el año, accedió a la posibilidad de largar en el primer lugar de la grilla en la carrera del día siguiente.
    // En la primera final del domingo, pudo mantener el liderazgo hasta que sufrió un despiste en una curva tras tocarse con el auto de Franco Vivían. Igualmente, logró completar la carrera y finalizó en el 10º puesto.
    // En la segunda, Ciarrocchi largó 10º y pudo escalar hasta el 6º lugar en una carrera que ganó Matías Rossi, su compañero de equipo en el Toyota Gazoo Racing y subcampeón detrás de Leonel Pernía.
    // De esta manera, el piloto de Almafuerte culminó en el séptimo puesto del campeonato con 202 puntos, cerrando una temporada que incluyó una victoria en Concepción del Uruguay, ésta “pole position” en la última prueba y tres récords de vuelta.
    //       `,
    //       image:
    //         "https://depor3.com/wp-content/uploads/2024/12/ciarrochi-1-800x445.jpg",
    //       date: "17/12/2024",
    //       active: true,
    //     },
    //     {
    //       _id: "123",
    //       title: "Con Assum y Reinaudi, Racing avanza en la Liga Argentina ",
    //       description: "",
    //       category: "Básquet",
    //       author: "Nicolás Cravero",
    //       body: `Tras una irregular primera fase, Racing de Chivilcoy, equipo que cuenta entre sus filas con dos riotercerenses, -Santiago Assum y Lucio Reinaudi-, avanzó a una nueva instancia de la Liga Argentina, segunda categoría del básquetbol nacional.
    //       Este fin de semana, los últimos subcampeones de la divisional, ganaron el cuadrangular de segunda ronda disputado en Lanus y accedieron a una ronda semifinal que se jugará con un formato similar entre el 20 y 22 de diciembre.
    // Aunque Assum fue goleador con 16 puntos, no pudo evitar la derrota de “La Academia” 50-71 ante Gimnasia de La Plata en el primer juego donde Reinuadi aportó un tanto. Luego llegó la victoria 68-55 ante Ciclista de Junín (Assum 8pt. y Reinaudi 3pt.) para vencer en el juego decisivo al local Lanus 68-65 y dejarlo afuera de competencia con otros 10 de “Santi” y 8 de Lucio.
    // En sede a confirmar mediante licitación, Racing jugará ahora otro cuadrangular con Quilmes de Mar del Plata, Villa Mitre de Bahía Blanca y Pico FC de General Pico, buscando el boleto a la instancia final de este Torneo Apertura.
    //       `,
    //       image: "https://depor3.com/wp-content/uploads/2024/12/racing-730x445.jpg",
    //       date: "16/12/2024",
    //       active: true,
    //     },
    //     {
    //       _id: "123",
    //       title: "LRRF: la primera final se celebró en Berrotarán",
    //       description: "",
    //       category: "Fútbol",
    //       author: "Depor3",
    //       body: `
    //       Jugando como local y de manera agónica, Belgrano FC de Berrotarán le dio vuelta el marcador a Deportivo Independiente, para ganar 2-1 la final de ida del Torneo Clausura de la Liga Regional Riotercerense de Fútbol (LRRF).
    //       Joaquín Cepeda puso en ventaja al “rojo” cuando corrían siete minutos del complemento, pero Jonathan Castro niveló a los 22 para el “celeste” que terminó ganando con gol de Carlos Passera en el minuto 50. Vale resaltar que todas las anotaciones llegaron por medio de cabezazos tras la ejecución de tiros de esquina.
    // La revancha se disputará el próximo viernes desde las 21.45 en el estadio “Pura Molina” de Río Tercero.
    // Por otra parte, la primera final de Reserva quedó para el vigente campeón, Sportivo 9 de Julio, que superó 2-1 a Estudiantes de Hernando como visitante.
    // FOTO: Ibrahim Michref
    //       `,
    //       image:
    //         "https://depor3.com/wp-content/uploads/2024/12/belgrano-800x445.jpeg",
    //       date: "16/12/2024",
    //       active: true,
    //     },
    //     {
    //       _id: "123",
    //       title:
    //         "Llega una velada de reconocimiento para el deporte de Río Tercero con los premios Media Luna ",
    //       description: "",
    //       category: "Política deportiva",
    //       author: "Depor3",
    //       body: `Desde la Municipalidad de Río Tercero informaron que están abiertas las inscripciones para la Escuela Deportiva Recreativa de Verano para niños y niñas de 6 a 12 años de toda la ciudad.
    //           La iniciativa se llevará a cabo en la pileta del Club Atlético Río Tercero, con una primera etapa que irá del 6 al 24 de enero y para inscribirse es necesario ingresar al link: https://rio3.ar/Verano25PrimerEtapa`,
    //       image:
    //         "https://depor3.com/wp-content/uploads/2024/12/premios-1-800x445.jpg",
    //       date: "17/12/2024",
    //       active: true,
    //     },
    //     {
    //       _id: "123",
    //       title:
    //         "Nueve albergará un campus de la reconocida academia de Matías Gallo",
    //       description: "",
    //       category: "Básquet",
    //       author: "Depor3",
    //       body: `La ciudad entrerriana de Concordia, albergó este fin de semana, el “Gran Premio Coronación” de la 12ª fecha del 45⁰ Campeonato Argentino de TC200, donde el piloto almafuertense Marcelo Ciarrocchi logro meterse en el “top ten”, además de conseguir la “pole position” en la clasificación.
    //       El día sábado, con su Toyota Corolla fue el mejor de la clasificación y por única vez en el año, accedió a la posibilidad de largar en el primer lugar de la grilla en la carrera del día siguiente.
    // En la primera final del domingo, pudo mantener el liderazgo hasta que sufrió un despiste en una curva tras tocarse con el auto de Franco Vivían. Igualmente, logró completar la carrera y finalizó en el 10º puesto.
    // En la segunda, Ciarrocchi largó 10º y pudo escalar hasta el 6º lugar en una carrera que ganó Matías Rossi, su compañero de equipo en el Toyota Gazoo Racing y subcampeón detrás de Leonel Pernía.
    // De esta manera, el piloto de Almafuerte culminó en el séptimo puesto del campeonato con 202 puntos, cerrando una temporada que incluyó una victoria en Concepción del Uruguay, ésta “pole position” en la última prueba y tres récords de vuelta.
    //       `,
    //       image: "https://depor3.com/wp-content/uploads/2024/12/gallo.jpeg",
    //       date: "13/12/2024",
    //       active: true,
    //     },
  ],
  newDetail: null,
  newsPatio: [],
  newPatio: null,
  loadingNews: false,
  draftDetail: null,
  loadingDrafts: false,
  draftLoaded: false,
  newsLoaded: false,
  newsPatioLoaded: false,
  errorNews: false,
  totalPages: 1,
  currentPage: 1,
};

export const createNewsSlice: StateCreator<NewsSlice> = (set) => ({
  ...initialState,
  resetCargaDatosState: () => set({ ...initialState }),
  getAllNews: async (page?: number, limit?: number, title?: string, category?: string) => {
    set({ loadingNews: true });
    try {
      const response = await NewsService.getAllNews(page, limit, title, category);
      if (!response) throw new Error("No se encontraron las noticias");
      set({ news: response.data, newsLoaded: true, totalPages: response.info.totalPages });
    } catch (error) {
      set({ errorNews: true });
    } finally {
      set({ loadingNews: false });
    }
  },
  getAllNewsPatio: async (page: number, limit: number, title?: string) => {
    set({ loadingNews: true });
    try {
      const response = await NewsService.getAllNewsPatio(page, limit, title);
      if (!response) throw new Error("No se encontraron las noticias");
      set({
        newsPatio: response.data,
        newsLoaded: true,
        totalPages: response.info.totalPages,
        // count: response.info.count,
      });
    } catch (error) {
      set({ errorNews: true });
    } finally {
      set({ loadingNews: false });
    }
  },
  getNewById: async (id) => {
    set({ loadingNews: true });
    try {
      const response = await NewsService.getNewById(id);
      if (!response) throw new Error("No se encontró la noticia");
      set({ newDetail: response.data, newsLoaded: true });
    } catch (error) {
      set({ errorNews: true });
    } finally {
      set({ loadingNews: false });
    }
  },
  getNewPatioById: async (id) => {
    set({ loadingNews: true });
    try {
      const response = await NewsService.getNewPatioById(id);
      if (!response) throw new Error("No se encontró la noticia");
      set({ newPatio: response.data, newsPatioLoaded: true });
    } catch (error) {
      set({ errorNews: true });
    } finally {
      set({ loadingNews: false });
    }
  },
  getDraftById: async (id: string) => {
    set({ loadingDrafts: true });
    try {
      const response = await NewsService.getDraftById(id);
      if (!response) throw new Error("No se encontraron las noticias");
      set({ draftDetail: response.data, draftLoaded: true });
    } catch (error) {
      set({ errorNews: true });
    } finally {
      set({ loadingDrafts: false });
    }
  },
  setCurrentPage: (val: number) => set({ currentPage: val })
});
