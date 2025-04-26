<template>
  <div class="flex flex-col md:flex-row h-screen bg-gray-50">
    <!-- Mobile Sidebar Toggle -->
    <div class="md:hidden p-2 bg-white border-b border-gray-200">
      <button @click="toggleSidebar" class="p-2 text-gray-500">
        <Bars3Icon class="w-6 h-6" />
      </button>
    </div>

    <!-- Sidebar - hidden on mobile by default -->
    <AdminSidebar
      :class="{ 'hidden md:block': !sidebarOpen, block: sidebarOpen }"
    />

    <div class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="p-4 md:p-8 overflow-auto">
        <div
          class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4"
        >
          <div class="flex items-center gap-3">
            <h1 class="text-2xl md:text-[28px] font-bold text-gray-900">
              Transaksi
            </h1>
            <div class="flex gap-2">
              <button class="text-gray-400 hover:text-gray-600">
                <LinkIcon class="w-5 h-5" />
              </button>
              <button class="text-gray-400 hover:text-gray-600">
                <EyeIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button
              class="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm"
            >
              Share
            </button>
            <button class="p-2 text-gray-400 hover:text-gray-600">
              <Squares2X2Icon class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Filter Section -->
        <div class="bg-white rounded-2xl shadow-sm mb-6">
          <div
            class="flex flex-col md:flex-row items-start md:items-center p-4 gap-4"
          >
            <div class="flex items-center gap-2 min-w-[100px]">
              <FunnelIcon class="w-5 h-5 text-gray-400" />
              <span class="text-sm font-medium">Filter By</span>
            </div>
            <div class="flex flex-wrap items-center gap-3 flex-1 w-full">
              <select
                class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
              >
                <option>Date</option>
              </select>
              <select
                class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
              >
                <option>Order Type</option>
              </select>
              <select
                class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm min-w-[140px] mb-2 md:mb-0"
              >
                <option>Order Status</option>
              </select>
              <button
                class="flex items-center gap-2 text-pink-500 font-medium text-sm"
              >
                <ArrowPathIcon class="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        <!-- Transaction Table for Desktop -->
        <div
          class="bg-white rounded-2xl shadow-sm overflow-hidden hidden md:block"
        >
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b border-gray-100">
                <th
                  class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  NAME
                </th>
                <th
                  class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Keterangan
                </th>
                <th
                  class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  DATE & TIME
                </th>
                <th
                  class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  TYPE
                </th>
                <th
                  class="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr
                v-for="transaction in transactions"
                :key="transaction.id"
                class="hover:bg-gray-50"
              >
                <td class="py-4 px-6 text-sm font-medium text-gray-900">
                  {{ transaction.id }}
                </td>
                <td class="py-4 px-6 text-sm text-gray-900">
                  {{ transaction.name }}
                </td>
                <td class="py-4 px-6 text-sm text-gray-500">
                  {{ transaction.description }}
                </td>
                <td class="py-4 px-6 text-sm text-gray-500">
                  {{ transaction.date }}
                </td>
                <td class="py-4 px-6 text-sm text-gray-500">
                  {{ transaction.type }}
                </td>
                <td class="py-4 px-6">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-medium inline-block"
                    :class="{
                      'bg-green-100 text-green-600':
                        transaction.status === 'Completed',
                      'bg-purple-100 text-purple-700':
                        transaction.status === 'Processing',
                      'bg-red-100 text-red-600':
                        transaction.status === 'Cancelled',
                      'bg-yellow-100 text-yellow-600':
                        transaction.status === 'On Hold',
                    }"
                  >
                    {{ transaction.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Transaction Cards for Mobile -->
        <div class="md:hidden space-y-4">
          <div
            v-for="transaction in transactions"
            :key="transaction.id"
            class="bg-white rounded-2xl shadow-sm p-4"
          >
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="font-medium text-gray-900">
                  {{ transaction.name }}
                </h3>
                <p class="text-sm text-gray-500">ID: {{ transaction.id }}</p>
              </div>
              <span
                class="px-3 py-1 rounded-full text-xs font-medium inline-block"
                :class="{
                  'bg-green-100 text-green-600':
                    transaction.status === 'Completed',
                  'bg-purple-100 text-purple-700':
                    transaction.status === 'Processing',
                  'bg-red-100 text-red-600': transaction.status === 'Cancelled',
                  'bg-yellow-100 text-yellow-600':
                    transaction.status === 'On Hold',
                }"
              >
                {{ transaction.status }}
              </span>
            </div>
            <p class="text-sm text-gray-500 mb-2">
              {{ transaction.description }}
            </p>
            <div class="flex justify-between text-sm text-gray-500">
              <span>{{ transaction.date }}</span>
              <span>{{ transaction.type }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  LinkIcon,
  EyeIcon,
  FunnelIcon,
  CalendarIcon,
  Squares2X2Icon,
  ArrowPathIcon,
  Bars3Icon,
} from "@heroicons/vue/24/outline";

import { ref } from "vue";

definePageMeta({
  layout: false,
});

const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const transactions = [
  {
    id: "00001",
    name: "Zahira Salsabila",
    description: "Hair Coloring, Potong Rambut",
    date: "04 Sep 2019",
    type: "Cashless",
    status: "Completed",
  },
  {
    id: "00002",
    name: "Puwurrr",
    description: "afhhsjusbjkqnajkha",
    date: "28 May 2019",
    type: "Cahless",
    status: "Processing",
  },
  {
    id: "00003",
    name: "Darrell Caldwell",
    description: "bajhbshjbsagu asna",
    date: "23 Nov 2019",
    type: "Cashless",
    status: "Cancelled",
  },
  {
    id: "00004",
    name: "Gilbert Johnston",
    description: "abzshajnjkajhusa",
    date: "05 Feb 2019",
    type: "Cashless",
    status: "Completed",
  },
  {
    id: "00005",
    name: "Alan Cain",
    description: "agjksnaikmaian",
    date: "29 Jul 2019",
    type: "Cash",
    status: "Processing",
  },
  {
    id: "00006",
    name: "Alfred Murray",
    description: "nauhuaajjajioa",
    date: "15 Aug 2019",
    type: "Cash",
    status: "Completed",
  },
  {
    id: "00007",
    name: "Maggie Sullivan",
    description: "iajjiajamkkoa",
    date: "21 Dec 2019",
    type: "Cahless",
    status: "Processing",
  },
  {
    id: "00008",
    name: "Rosie Todd",
    description: "anaka jja",
    date: "30 Apr 2019",
    type: "Cashless",
    status: "On Hold",
  },
  {
    id: "00009",
    name: "Dollie Hines",
    description: "ahbabuasbhab",
    date: "09 Jan 2019",
    type: "Cashless",
    status: "Processing",
  },
];
</script>
