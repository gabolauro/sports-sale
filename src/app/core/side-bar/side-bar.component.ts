import { ChangeDetectionStrategy, Component, Signal, inject  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sport } from '@domain/sport.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { SportsApi } from '@api/sports.api';

@Component({
  selector: 'ss-side-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarComponent {
  #sportApi = inject(SportsApi);
  sports: Signal<Sport[]> = toSignal(this.#sportApi.getActivities$(), { initialValue: [] });
}
