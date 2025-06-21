// src/lib/rete/components.ts
import { ClassicPreset } from 'rete';
import Numcontrol from './Numcontrol.svelte'; // Your svelte component

// Define a custom control that uses a Svelte component
class SvelteControl<T> extends ClassicPreset.Control {
    component;
    props: T;
    set: any;

    constructor(component: any, props: T) {
        super();
        this.component = component;
        this.props = props;

        // This tells the Svelte render plugin to use our component
        this.set({ render: 'svelte', component, props });
    }
}

// This is the Rete.js v2 equivalent of your "MyComponent"
export class NumberNode extends ClassicPreset.Node<
    { num: ClassicPreset.Socket }, // Inputs
    { res: ClassicPreset.Socket }, // Outputs
    { num: SvelteControl<{ value: number, label: string, change: (v: number) => void }> } // Controls
> {
    height = 160; // Set dimensions for proper layout
    width = 180;

    constructor(
        options: { initial: number },
        // A function to call when the control's value changes
        private onChange: (value: number) => void
    ) {
        super('Number');
        const socket = new ClassicPreset.Socket('socket');

        // Define inputs and outputs
        this.addInput('num', new ClassicPreset.Input(socket, 'Number'));
        this.addOutput('res', new ClassicPreset.Output(socket, 'Result'));

        // Define the custom Svelte control
        this.addControl('num', new SvelteControl(
            Numcontrol,
            {
                value: options.initial,
                label: 'Value',
                change: (v) => this.handleValueChange(v)
            }
        ));
    }

    // This is the equivalent of the v1 "worker" method
    data(inputs: { num?: number[][] }): { res: number } {
        // Use connected input if available, otherwise use the control's value
        const value = inputs.num?.flat()[0] ?? this.controls.num.props.value;

        // Update the control's UI if an input is connected
        this.controls.num.props.value = value;

        return {
            res: value
        };
    }

    // Method to handle changes from the Svelte control
    handleValueChange(value: number) {
        this.controls.num.props.value = value;
        if (this.onChange) {
            this.onChange(value);
        }
    }
}