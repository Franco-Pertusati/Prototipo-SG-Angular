import { Component, signal } from '@angular/core';
import { Group } from '../../models/group.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css',
})
export class GroupComponent {
  groups = signal<Group[]>([
    { name: 'Pintas', products: [], enabled: true },
    { name: 'Bebidas', products: [], enabled: true },
  ]);

  changeGroupBool(index: number) {
    this.groups.update((groups) => {
      return groups.map((group, position) => {
        if (position === index) {
          return {
            ...group,
            optionsDisplayed: !group.optionsDisplayed,
          };
        }
        return {
          ...group,
          optionsDisplayed: false,
        };
      });
    });
  }

  activeRenameInput(index: number) {
    this.groups.update((groups) => {
      return groups.map((group, position) => {
        if (position === index) {
          return {
            ...group,
            editingName: true,
          };
        }
        return {
          ...group,
          editingName: false,
        };
      });
    });
  }

  updateGroupName(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.groups.update((groups) => {
      return groups.map((group, position) => {
        if (position === index) {
          return {
            ...group,
            name: input.value,
            editingName: false,
          };
        }
        return group;
      });
    });
  }

  updateGroupDisponibility(index: number) {
    this.groups.update((groups) => {
      return groups.map((group, position) => {
        if (position === index) {
          return {
            ...group,
            enabled: !group.enabled,
          };
        }
        return group;
      });
    });
  }

  newItemNameCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  changeHandler(event: Event) {
    if (this.newItemNameCtrl.valid) {
      const value = this.newItemNameCtrl.value.trim();
      if (value !== '') {
        this.addGroup(value);
        this.newItemNameCtrl.setValue('');
      }
    }
  }

  addGroup(name: string) {
    const newGroup = {
      name,
      products: [],
      enabled: true,
    };
    this.groups.update((groups) => [...groups, newGroup]);
  }

  deleteGroup(index: number) {
    this.groups.update((groups) =>
      groups.filter((group, position) => position !== index)
    );
  }
}
