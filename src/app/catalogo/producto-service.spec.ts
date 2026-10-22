import { TestBed } from '@angular/core/testing';
import { ProductoService } from './producto-service';

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoService);
  });

  it('debe crearse con el catálogo precargado', () => {
    expect(service).toBeTruthy();
    expect(service.productos().length).toBeGreaterThan(0);
  });

  it('expone solo platos destacados en `destacados` (computed)', () => {
    expect(service.destacados().every((plato) => plato.destacado)).toBe(true);
  });
});
