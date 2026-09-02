Set shell = CreateObject("WScript.Shell")
Set files = CreateObject("Scripting.FileSystemObject")

' Always replace an older Port server so software updates take effect immediately.
On Error Resume Next
Set processes = GetObject("winmgmts:\\.\root\cimv2").ExecQuery("Select ProcessId, CommandLine from Win32_Process where Name='node.exe'")
For Each process In processes
  commandLine = LCase("" & process.CommandLine)
  If InStr(commandLine, "admin-server.js") > 0 Then process.Terminate
Next
On Error GoTo 0
WScript.Sleep 450

project = "Q:\Codex\Portfolio webv.01"
node = "C:\Users\guany\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

If files.FileExists(node) Then
  shell.Run Chr(34) & node & Chr(34) & " " & Chr(34) & project & "\admin-server.js" & Chr(34), 0, False
Else
  shell.Run "cmd /c """ & project & "\Launch Portfolio Content Studio.cmd""", 0, False
End If

WScript.Sleep 1200

edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
If Not files.FileExists(edge) Then edge = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"

If files.FileExists(edge) Then
  shell.Run Chr(34) & edge & Chr(34) & " --app=http://127.0.0.1:4184/admin/ --new-window", 1, False
Else
  shell.Run "http://127.0.0.1:4184/admin/", 1, False
End If
