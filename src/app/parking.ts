import { inject, Inject, Injectable, signal } from '@angular/core';
import {
  ChatSession,
  FunctionDeclarationsTool,
  getAI,
  getGenerativeModel,
  Schema
} from 'firebase/ai';
import { FirebaseApp } from 'firebase/app';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Ticket } from './ticket';

@Injectable({
  providedIn: 'root'
})
export class Parking {
  readonly tickets = signal<Ticket[]>([]);
  private readonly chat: ChatSession;
  private notification = inject(NzNotificationService);
  
  constructor(@Inject('FIREBASE_APP') firebaseApp: FirebaseApp) {
    const toolset: FunctionDeclarationsTool = {
      functionDeclarations: [
        {
          name: 'addTicket',
          description: 'Add one ticket',
          parameters: Schema.object({
            properties: {
              plateNo: Schema.string(),
              arrival: Schema.string(),
              location: Schema.string()
            }
          }),
          functionReference: (args: Record<string, string>) => {
            this.createTicket({
              plateNo: args['plateNo'],
              arrival: new Date(args['arrival']),
              location: args['location']
            });
          }
        }
      ]
    };
    const instructions = `
      Welcome to citypass.
      You are an agent for this car parking validator.
      You will assist users by submitting parking tickets.
      You can convert date phrases to ISO strings and
      act as a geocode service to convert a location or address
      to coordinates long/lat.
    `;

    const ai = getAI(firebaseApp);
    
    const model = getGenerativeModel(ai, {
      model: 'gemini-3.8-flash',
      systemInstruction: instructions,
      tools: [toolset]
    });

    this.chat = model.startChat();
  }

  async ask(prompt: string) {
    try {
      await this.chat.sendMessage(prompt);
    } catch (error) {
      this.notification.create(
        'error',
        'Ticket Error',
        error instanceof Error ? error.message : 'Failed to create ticket'
      );
    }
  }

  createTicket(ticket: Ticket) {
    this.tickets.update(tickets => [
      ...tickets,
      ticket
    ]);

    this.notification.create('success', 'Ticket Added', 'Plate no: ' + ticket.plateNo);
  }
}
