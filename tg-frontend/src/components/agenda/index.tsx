// components/agenda/index.tsx
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@nextui-org/react";
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

export default function Agenda() {
  return (
    <Card className="p-4 bg-white text-black shadow-md">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "today prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale={ptBrLocale}
        height="auto"
        events={[
          {
            title: "Consulta Dermatologia",
            date: "2022-06-14",
          },
          {
            title: "Consulta Pediatria",
            date: "2022-06-20",
          },
        ]}
        contentHeight="auto"
        dayCellClassNames="bg-white text-black"
        eventClassNames="text-black"
      />
    </Card>
  );
}
