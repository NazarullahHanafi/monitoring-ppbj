<table class="w-full border-collapse border">
  <thead class="bg-gray-100">
    <tr>
      <th class="border p-2 text-left">PPBJ</th>
      <th class="border p-2 text-left">Uraian</th>
      <th class="border p-2 text-left">Portofolio</th>
      <th class="border p-2 text-left">Buyer</th>
      <th class="border p-2 text-left">Target SLA</th>
      <th class="border p-2 text-left">Sisa</th>
      <th class="border p-2 text-left">Status</th>
      <th class="border p-2 text-left">Progres</th>
    </tr>
  </thead>

  <tbody>
    @foreach ($ppbjs as $ppbj)
      <tr class="border-t">
        <td class="border p-2">{{ $ppbj->ppbj_no }}</td>
        <td class="border p-2">{{ $ppbj->uraian }}</td>
        <td class="border p-2">{{ $ppbj->portofolio }}</td>
        <td class="border p-2">{{ $ppbj->buyer }}</td>
        <td class="border p-2">{{ $ppbj->target_sla_hari }}</td>
        <td class="border p-2">{{ $ppbj->sisa_target_sla }}</td>

        <td class="border p-2">
          <span class="px-2 py-1 rounded text-white
            {{ $ppbj->status_sla === 'OVERDUE' ? 'bg-red-600' :
               ($ppbj->status_sla === 'WARNING' ? 'bg-yellow-500' : 'bg-green-600') }}">
            {{ $ppbj->status_sla }}
          </span>
        </td>

        <td class="border p-2">{{ $ppbj->progres }}%</td>
      </tr>
    @endforeach
  </tbody>
</table>

<div class="mt-4">
  {{ $ppbjs->links() }}
</div>
