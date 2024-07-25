import { defineComponent, inject, onMounted, ref } from 'vue';
import { ModulesRepository } from '@/module/domain/ModulesRepository';
import { Preset } from '@/module/domain/Preset';

export default defineComponent({
  name: 'LandscapePresetConfigurationComponentVue',
  emits: ['selected'],
  setup(_, { emit }) {
    const presets = ref<Preset[]>([]);
    const modules = inject('modules') as ModulesRepository;

    onMounted(() => {
      modules
        .preset()
        .then(response => {
          presets.value = response.presets;
        })
        .catch(error => console.error(error));
    });

    const handlePresetChange = (event: Event) => {
      const selectedValue = (event.target as HTMLSelectElement).value;
      const selectedPreset = presets.value.find(preset => preset.name === selectedValue);
      emit('selected', selectedPreset);
    };

    return {
      presets,
      handlePresetChange,
    };
  },
});
