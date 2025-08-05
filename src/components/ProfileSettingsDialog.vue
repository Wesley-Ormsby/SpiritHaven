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
        <span class="f-error" v-if="validUsername">&nbsp;</span>
        <span class="f-error" v-else>
          Invalid: 6-15 characters (letters, numbers, or underscores).</span
        >
      </label>
      <label>
        Bio Description
        <Textarea type="text" v-model="description" maxlength="300" rows="4" />
      </label>
      <label>
        Profile Image
        <Select v-model="selectedSpirit" :options="spiritChoices" optionLabel="spirit" fluid filter>
          <template #value="slotProps">
            <div v-if="slotProps.value" class="f-select-option">
              <div class="f-select-option-image"><SpiritAvatar class="select-image" :spirit="slotProps.value as Spirit"></SpiritAvatar></div>
              <div>{{ slotProps.value }}</div>
            </div>
          </template>
          <template #option="slotProps">
            <div class="f-select-option">
                <div class="f-select-option-image"><SpiritAvatar :spirit="slotProps.option as Spirit"></SpiritAvatar></div>
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
textarea {
  resize: none;
}
@media only screen and (max-width: 500px) {
  ::v-deep(.p-textarea),
  .select-option,
  .p-inputtext {
    font-size: 12px !important;
  }
}
</style>
