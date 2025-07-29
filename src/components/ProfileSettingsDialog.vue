<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { X } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import type { Spirit } from '@/scripts/types'
import { useGlobalStore } from '@/scripts/globalStore'
import {} from '@/scripts/auth'
import { SPIRITS } from '@/scripts/data'
import { supabase } from '@/scripts/auth'
import Select from 'primevue/select'
import SpiritAvatar from '@/components/SpiritAvatar.vue'
import { setSupabaseError } from '@/scripts/supabaseErrors'
const { profileData, userData } = useGlobalStore
const visible = defineModel<boolean>('visible')
const loadingChanges = ref(false)

// Profile page
const spiritChoices = ref<Spirit[]>(Object.keys(SPIRITS) as Spirit[])
const selectedSpirit = ref<Spirit>('river surges in sunlight')

// Username
const username = ref('')
const validUsername = computed(() => username.value.match(/^[a-zA-Z0-9_]{6,15}$/) != null)

// Description
const description = ref('')

// General functions
function open() {
  // reset variables
  selectedSpirit.value = profileData.spirit
  username.value = profileData.username
  description.value = profileData.description
  loadingChanges.value = false
}

async function saveSettings() {
  if (userData.value == null) {
    return
  }

  loadingChanges.value = true
  const { error } = await supabase
    .from('Users')
    .update({
      spirit: selectedSpirit.value,
      username: username.value,
      description: description.value,
    })
    .eq('id', userData.value.id)

  if (error) {
    setSupabaseError(error)
  } else {
    profileData.spirit = selectedSpirit.value
    userData.value.spirit = selectedSpirit.value
    profileData.username = username.value
    userData.value.username = username.value
    profileData.description = description.value
    userData.value.description = description.value
  }
  // Close model
  loadingChanges.value = false
  visible.value = false
}
</script>
<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Update Profile"
    :style="{ width: '25rem' }"
    :breakpoints="{ '500px': '80vw' }"
    :draggable="false"
    @show="open"
  >
    <template #closebutton="{ closeCallback }">
      <X class="close-x" @click="closeCallback"></X>
    </template>
    <div class="form">
      <label>
        Username
        <InputText type="text" v-model="username" :invalid="!validUsername" maxlength="15" />
        <span class="error" v-if="validUsername"></span>
        <span class="error" v-else>
          Invalid: 6-15 characters (letters, numbers, or underscores).</span
        >
      </label>
      <label>
        Bio Description
        <Textarea type="text" v-model="description" maxlength="300" rows="4" />
      </label>
      <label>
        Profile Image
        <Select v-model="selectedSpirit" :options="spiritChoices" optionLabel="spirit" fluid>
          <template #value="slotProps">
            <div v-if="slotProps.value" class="select-option">
              <SpiritAvatar class="select-image" :spirit="slotProps.value as Spirit"></SpiritAvatar>
              <div>{{ slotProps.value }}</div>
            </div>
          </template>
          <template #option="slotProps">
            <div class="select-option">
              <SpiritAvatar
                class="select-image"
                :spirit="slotProps.option as Spirit"
              ></SpiritAvatar>
              <div>{{ slotProps.option }}</div>
            </div>
          </template>
        </Select>
      </label>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <Button class="secondary" @click="visible = false">Cancel</Button>
        <Button @click="saveSettings" :disabled="!validUsername">Save</Button>
      </div>
    </template>
  </Dialog>
</template>
<style scoped>
/* FORM */
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
label {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.select-option {
  display: flex;
  flex-direction: row;
  text-transform: capitalize;
  align-items: center;
  gap: 10px;
  max-width: 60vw;
}
.select-option div {
  overflow: hidden;
  text-overflow: ellipsis;
}
.select-image {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
}
textarea {
  resize: none;
}

/* HEADER + FOOTER */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}
.secondary {
  background-color: var(--p-surface-300);
  border-color: var(--p-surface-300) !important;
  color: var(--p-surface-900) !important;
}
.secondary:hover {
  background-color: var(--p-surface-400) !important;
}
.close-x {
  stroke: var(--p-surface-600);
  transition: 0.3s stroke;
  cursor: pointer;
}
.close-x:hover {
  stroke: var(--p-surface-900);
}
.error {
  color: var(--p-red-500);
  height: 16px;
  font-size: 12px;
}

@media only screen and (max-width: 500px) {
  ::v-deep(.p-textarea),
  .select-option,
  .p-inputtext {
    font-size: 12px !important;
  }
}
</style>
