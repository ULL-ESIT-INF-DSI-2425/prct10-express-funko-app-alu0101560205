import { describe, it, expect } from 'vitest';
import { findSpell } from '../src/ejercicios_de_repaso/Ejercicio_2/app';

describe('findSpell', () => {
  it('debería encontrar hechizos por nombre', () => {
    return findSpell('Accio').then((spells) => {
      expect(spells.length).toBeGreaterThan(0);
      expect(spells[0].name).toContain('Accio');
    });
  });

  it('debería encontrar hechizos por tipo', () => {
    return findSpell(undefined, 'Charm').then((spells) => {
      expect(spells.length).toBeGreaterThan(0);
      expect(spells[0].type).toBe('Charm');
    });
  });

  it('debería encontrar hechizos por encantamiento', () => {
    return findSpell(undefined, undefined, 'Expelliarmus').then((spells) => {
      expect(spells.length).toBeGreaterThan(0);
      expect(spells[0].incantation).toBe('Expelliarmus');
    });
  });

  it('debería rechazar la promesa si no se encuentran hechizos', () => {
    return findSpell('HechizoInexistente123').catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('No se encontraron hechizos.');
    });
  });
});
