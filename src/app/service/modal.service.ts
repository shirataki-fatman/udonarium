import { Injectable, ViewContainerRef, ComponentFactoryResolver, ReflectiveInjector, ComponentRef, } from "@angular/core";
//import { ModalComponent } from '../component/modal/modal.component';

/*
thanks
http://qiita.com/Quramy/items/ccfcfa0e45dd9e43f041
http://qiita.com/alclimb/items/1c740a432c10b6dc700a
*/

declare var Type: FunctionConstructor;
interface Type<T> extends Function {
  new (...args: any[]): T;
}

class ModalContext {
  constructor(
    private _resolve: Function,
    private _reject: Function,
    public option?: any
  ) {
  }
  resolve(value: any) {
    this._resolve(value);
    this._resolve = null;
  }
  reject(reason?: any) {
    this._reject(reason);
    this._reject = null;
  }
}

@Injectable()
export class ModalService {
  private modalContext: ModalContext = null;
  private count = 0;
  
  title: string = '無名のモーダル';

  /* Todo */
  static defaultParentViewContainerRef: ViewContainerRef;
  static ModalComponentClass: { new (...args: any[]): any } = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  get option(): any {
    return this.modalContext ? this.modalContext.option : null;
  }

  get isShow(): boolean {
    return this.count > 0;
  }

  open<T>(childComponent: { new (...args: any[]) }, option?, parentViewContainerRef?: ViewContainerRef): Promise<T> {
    if (this.isShow) return;
    if (!parentViewContainerRef) {
      parentViewContainerRef = ModalService.defaultParentViewContainerRef;
      console.log('Modal Open', parentViewContainerRef);
    }
    let panelComponentRef: ComponentRef<any>;
    return new Promise<T>((resolve, reject) => {
      // Injector 作成
      const _resolve = (val: T) => {
        if (panelComponentRef) {
          panelComponentRef.destroy();
          resolve(val);
          this.count--;
        }
      };

      const _reject = (reason?: any) => {
        if (panelComponentRef) {
          panelComponentRef.destroy();
          reject(reason);
          this.count--;
        }
      };

      /*
      const bindings = ReflectiveInjector.resolve([
        { provide: ModalContext, useValue: new ModalContext(_resolve, _reject) }
      ]);
      */
      const childModalService: ModalService = new ModalService(this.componentFactoryResolver);
      childModalService.modalContext = new ModalContext(_resolve, _reject, option);

      const providers = ReflectiveInjector.resolve([
        { provide: ModalService, useValue: childModalService }
      ]);
      const parentInjector = parentViewContainerRef.injector;//parentViewContainerRef.parentInjector;
      const injector = ReflectiveInjector.fromResolvedProviders(providers, parentInjector);

      // componentRef作成
      /* 基本コード */
      //componentRef = parentViewContainerRef.createComponent(componentFactory, parentViewContainerRef.length, injector);
      //parentViewContainerRef.element.nativeElement.appendChild(componentRef.location.nativeElement);
      /* ---------- */

      const panelComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalService.ModalComponentClass);
      const bodyComponentFactory = this.componentFactoryResolver.resolveComponentFactory(childComponent);
      panelComponentRef = parentViewContainerRef.createComponent(panelComponentFactory, parentViewContainerRef.length, injector);
      panelComponentRef.instance.content.createComponent(bodyComponentFactory);
      //panelComponentRef.instance.modalService = childModalService;

      panelComponentRef.onDestroy(() => {
        this.count--;
      });

      //panelComponentRef = createModalComponent(this.componentFactoryResolver, parentViewContainerRef, childComponent, injector);

      this.count++;
    });
  }

  resolve(value?: any) {
    if (this.modalContext) {
      this.modalContext.resolve(value);
      this.modalContext = null;
    }
  }

  reject(reason?: any) {
    if (this.modalContext) {
      this.modalContext.reject(reason);
      this.modalContext = null;
    }
  }
}