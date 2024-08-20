<script setup>
import useBlogAPI from '@/modules/blog/api/blog.api.js'

import manageForm from '@/modules/blog/components/SimplePage/manageForm.vue'

const { t } = useI18n()
const blogAPI = useBlogAPI()
const loader = useLoaderStore()
const notify = useNotifyStore()
useTitle('Simple Blog')

const dialogCreate = ref(false)
const blogs = ref([])
const page = ref(1)
const itemsPerPage = ref(10)
const itemsLength = ref(0)
const sortBy = ref([{ key: 'createdAt', order: 'desc' }])
const loading = ref(false)
const searchText = ref('')

const dialogUpdate = ref(false)
const updateItem = ref()

const dialogDelete = ref()

watch([dialogCreate, dialogUpdate], ([create, update]) => {
  if (!create && !update) reload()
})

const headers = computed(() => [
  {
    title: 'Created by',
    key: 'create_by_name',
  },
  { title: 'Created at', key: 'createdAt' },
  { title: 'Title', key: 'title' },
  {
    title: '',
    key: 'actions',
    sortable: false,
  },
])
async function onDelete(item) {
  const { isCanceled } = await dialogDelete.value.reveal()
  if (isCanceled) return
  try {
    loader.start()
    await blogAPI.remove(item._id)
    notify.success(t('notification.delete_success'))
    reload()
  } catch (err) {
    console.error(err)
  } finally {
    loader.stop()
  }
}
function openUpdate(item) {
  updateItem.value = item
  dialogUpdate.value = true
}
async function search({ page, itemsPerPage, sortBy }) {
  try {
    loading.value = true
    const data = await blogAPI.getAll({
      is_active: true,
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      ordering: sortBy
        .map((s) => `${s.order === 'desc' ? '-' : ''}${s.key}`)
        .join(','),
      search: searchText.value,
    })
    blogs.value = data.results
    itemsLength.value = data.count
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
function reload() {
  search({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    sortBy: sortBy.value,
  })
}

function initialize() {}

onMounted(() => {
  initialize()
})
</script>
<template>
  <v-container>
    <v-card>
      <v-card-title>
        <div class="d-flex flex-wrap">
          Simeple Blog <v-spacer></v-spacer>
          <v-btn
            color="success"
            prepend-icon="mdi-plus"
            @click="dialogCreate = true"
            >Create</v-btn
          >
        </div>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="searchText"
          label="Search"
          variant="outlined"
          clearable
        />
        <v-data-table-server
          v-model:page="page"
          v-model:items-per-page="itemsPerPage"
          v-model:sort-by="sortBy"
          :items="blogs"
          :headers="headers"
          :itemsLength="itemsLength"
          :loading="loading"
          :search="searchText"
          @update:options="search"
          hover
          :items-per-page-options="[10, 25, 50, 100]"
        >
          <template #item.actions="{ item }">
            <div class="d-flex flex-wrap tw-gap-1">
              <v-btn
                color="warning"
                density="comfortable"
                size="small"
                icon="mdi-pencil"
                @click="openUpdate(item)"
              ></v-btn>
              <v-btn
                color="error"
                density="comfortable"
                size="small"
                icon="mdi-delete"
                @click="onDelete(item)"
              ></v-btn>
            </div>
          </template>
        </v-data-table-server>
      </v-card-text>
    </v-card>

    <BaseDialog v-model="dialogCreate" title="Create blog" icon="mdi-post">
      <manageForm @close="dialogCreate = false" />
    </BaseDialog>
    <BaseDialog v-model="dialogUpdate" title="Edit blog" icon="mdi-post">
      <manageForm
        :updateItem="updateItem"
        isUpdate
        @close="dialogUpdate = false"
      />
    </BaseDialog>
    <BaseConfirmDialog
      ref="dialogDelete"
      title="Are you sure you want to delete this blog?"
    ></BaseConfirmDialog>
  </v-container>
</template>
