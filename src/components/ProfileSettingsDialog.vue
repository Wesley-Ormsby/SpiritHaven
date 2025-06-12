<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { X } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import type { Spirit } from '@/scripts/types'
import { profileData,userData } from '@/scripts/globalStore'
import {  } from '@/scripts/auth'
import { SPIRITS } from '@/scripts/data'
import { supabase } from '@/scripts/auth'
import Select from 'primevue/select'
import SpiritAvatar from '@/components/SpiritAvatar.vue'

const model = defineModel<boolean>({ required: true })

// Profile page
const spiritChoices = ref<{ spirit: Spirit }[]>(
  (Object.keys(SPIRITS) as Spirit[]).map((spirit) => ({ spirit })),
)
const selectedSpirit = ref<{ spirit: Spirit }>({ spirit: 'river surges in sunlight' })

// Username
const username = ref('')
const validUsername = computed(() => username.value.match(/^[a-zA-Z0-9_]{6,15}$/) != null)

// Description
const description = ref('')

// General functions
function open() {
  // reset variables
  selectedSpirit.value = { spirit: profileData.value.spirit }
  username.value = profileData.value.username
  description.value = profileData.value.description
}

async function saveSettings() {
  if (userData.value == null) {
    return
  }
  profileData.value.spirit = selectedSpirit.value.spirit
  userData.value.spirit = selectedSpirit.value.spirit
  profileData.value.username = username.value
  userData.value.username = username.value
  profileData.value.description = description.value
  userData.value.description = description.value

  const { data, error } = await supabase
    .from('Users')
    .update({
      spirit: profileData.value.spirit,
      username: username.value,
      description: description.value,
    })
    .eq('id', userData.value.id)

  // Close model
  model.value = false
}
</script>
<template>
  <Dialog
    v-model:visible="model"
    modal
    header="Update Profile"
    :style="{ width: '25rem' }"
    :breakpoints="{ '500px': '80vw' }"
    :draggable="false"
    @show="open"
    @hide=""
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
        <Textarea
          type="text"
          v-model="description"
          :invalid="!validUsername"
          maxlength="300"
          rows="4"
        />
      </label>
      <label>
        Profile Image
        <Select v-model="selectedSpirit" :options="spiritChoices" optionLabel="spirit" fluid>
          <template #value="slotProps">
            <div v-if="slotProps.value" class="select-option">
              <SpiritAvatar
                class="select-image"
                :spirit="slotProps.value.spirit as Spirit"
              ></SpiritAvatar>
              <div>{{ slotProps.value.spirit }}</div>
            </div>
          </template>
          <template #option="slotProps">
            <div class="select-option">
              <SpiritAvatar
                class="select-image"
                :spirit="slotProps.option.spirit as Spirit"
              ></SpiritAvatar>
              <div>{{ slotProps.option.spirit }}</div>
            </div>
          </template>
        </Select>
      </label>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <Button class="secondary" @click="model = false">Cancel</Button>
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
