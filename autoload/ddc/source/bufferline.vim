let s:buffers = []

function ddc#source#bufferline#use()
  call ddc#source#bufferline#release()
  eval s:buffers->add(bufnr())
endfunction

function ddc#source#bufferline#release()
  eval s:buffers->filter('v:val != bufnr()')
endfunction

function ddc#source#bufferline#clear()
  let s:buffers = []
endfunction

function ddc#source#bufferline#collect()
  return s:buffers->copy()->map('getbufline(v:val, 1, "$")')->flatten()
endfunction
