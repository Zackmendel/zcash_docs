---
title: "Zcash.conf Guide"
category: "Mining & Nodes"
id: "source/rtd_pages/zcash_conf_guide"
---

orphan  

# Zcash.conf Guide

Below contains information for additional configuration of the
`zcash.conf` file.

Notes:

- A blank zcash.conf file will run zcashd on mainnet.
- The most important setting to set is which network, mainnet, testnet,
  and regtest, zcashd to run. The other settings allow optimization of
  zcashd and how it interacts with other components it services.
- You can have multiple configuration files, and run zcashd with a flag
  `-conf=<file>` to run with a specific config file. We suggest keeping
  various configuration files to suit different needs, rather than
  editing your configuration file as needed.
- By default, the config file zcashd tries is `$HOME/.zcash/zcash.conf`
  on Debian and Windows, and
  `/Users/yourusername/Library/Application\ Support/Zcash/zcash.conf` on
  MacOS.

## Network-Related Settings

<table>
<colgroup>
<col style="width: 19%" />
<col style="width: 80%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Parameter</strong></td>
<td><strong>Description &amp; Example</strong></td>
</tr>
<tr class="even">
<td>testnet</td>
<td><p>Run on the test network instead of the real zcash network.</p>
<div class="sourceCode" id="cb1"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="va">testnet</span><span class="op">=</span>1</span></code></pre></div></td>
</tr>
<tr class="odd">
<td>regtest</td>
<td><p>Run a regression test network</p>
<div class="sourceCode" id="cb2"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a><span class="va">regtest</span><span class="op">=</span>1</span></code></pre></div></td>
</tr>
<tr class="even">
<td>proxy</td>
<td><p>Connect via a SOCKS5 proxy</p>
<div class="sourceCode" id="cb3"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a><span class="va">proxy</span><span class="op">=</span>127.0.0.1:9050</span></code></pre></div></td>
</tr>
<tr class="odd">
<td>bind</td>
<td><blockquote>
<p>Bind to given address and always listen on it. Use [host]:port
notation for IPv6</p>
</blockquote>
<div class="sourceCode" id="cb4"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a><span class="va">bind</span><span class="op">=&lt;</span>addr<span class="op">&gt;</span></span></code></pre></div></td>
</tr>
<tr class="even">
<td>whitebind</td>
<td><div class="line-block">Bind to given address and whitelist peers
connecting to it. Use [host]:port<br />
notation for IPv6</div>
<div class="sourceCode" id="cb5"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabindex="-1"></a><span class="va">whitebind</span><span class="op">=&lt;</span>addr<span class="op">&gt;</span></span></code></pre></div></td>
</tr>
</tbody>
</table>

<div class="admonition">

Quick Primer on addnode vs connect

Let's say for instance you use `addnode=4.2.2.4` addnode will connect
you to and tell you about the nodes connected to 4.2.2.4. In addition it
will tell the other nodes connected to it that you exist so they can
connect to you. Connect will not do the above when you 'connect' to it.
It will *only* connect you to 4.2.2.4 and no one else. So if you're
behind a firewall, or have other problems finding nodes, add some using
'addnode'. If you want to stay private, use 'connect' to only connect to
"trusted" nodes. If you run multiple nodes on a LAN, there's no need for
all of them to open lots of connections. Instead 'connect' them all to
one node that is port forwarded and has lots of connections.

Thanks goes to \[Noodle\] on Freenode.

</div>

<table>
<colgroup>
<col style="width: 19%" />
<col style="width: 80%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Parameter</strong></td>
<td><strong>Description &amp; Example</strong></td>
</tr>
<tr class="even">
<td>addnode</td>
<td><p>Use as many addnode= settings as you like to connect to specific
peers</p>
<div class="sourceCode" id="cb1"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="va">addnode</span><span class="op">=</span>69.164.218.197</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a><span class="va">addnode</span><span class="op">=</span>10.0.0.2:8233</span></code></pre></div></td>
</tr>
<tr class="odd">
<td>connect</td>
<td><div class="line-block">Alternatively use as many connect= settings
as you like to connect<br />
ONLY to specific peers</div>
<div class="sourceCode" id="cb2"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a><span class="va">connect</span><span class="op">=</span>69.164.218.197</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a><span class="va">connect</span><span class="op">=</span>10.0.0.1:8233</span></code></pre></div></td>
</tr>
<tr class="even">
<td>listen</td>
<td><p>Listening mode, enabled by default except when 'connect' is being
used</p>
<div class="sourceCode" id="cb3"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a><span class="va">listen</span><span class="op">=</span>1</span></code></pre></div></td>
</tr>
<tr class="odd">
<td>maxconnections</td>
<td><p>Maximum number of inbound+outbound connections.</p>
<div class="sourceCode" id="cb4"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a><span class="va">maxconnections</span><span class="op">=</span>6</span></code></pre></div></td>
</tr>
</tbody>
</table>

## JSON-RPC Options

Controlling a running Zcash/zcashd process

<table>
<colgroup>
<col style="width: 19%" />
<col style="width: 80%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Parameter</strong></td>
<td><strong>Description &amp; Example</strong></td>
</tr>
<tr class="even">
<td>addnode</td>
<td><p>Use as many addnode= settings as you like to connect to specific
peers</p>
<div class="sourceCode" id="cb1"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="va">addnode</span><span class="op">=</span>69.164.218.197</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a><span class="va">addnode</span><span class="op">=</span>10.0.0.2:8233</span></code></pre></div></td>
</tr>
<tr class="odd">
<td>server</td>
<td><p>Tells zcashd to accept JSON-RPC commands (set as default if not
specified)</p>
<div class="sourceCode" id="cb2"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a><span class="va">server</span><span class="op">=</span>1</span></code></pre></div></td>
</tr>
<tr class="even">
<td>rpcbind</td>
<td><div class="line-block">Bind to given address to listen for JSON-RPC
connections. Use [host]:port<br />
notation for IPv6. This option can be specified multiple times<br />
(default: bind to all interfaces)</div>
<div class="sourceCode" id="cb3"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a><span class="va">rpcbind</span><span class="op">=&lt;</span>addr<span class="op">&gt;</span></span></code></pre></div></td>
</tr>
<tr class="odd">
<td>rpcuser</td>
<td><p>If you set an rpcpassword using that option, you must also set
rpcuser.</p>
<div class="sourceCode" id="cb4"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a><span class="va">rpcuser</span><span class="op">=&lt;</span>username<span class="op">&gt;</span></span></code></pre></div></td>
</tr>
<tr class="even">
<td>rpcpassword</td>
<td><div class="line-block">If you specify this option, be sure it is
sufficiently-secure, see the<br />
notes below.</div>
<div class="line-block">When no rpcpassword option is specified, the
daemon now uses a special<br />
‘cookie’ file for authentication. This file is generated with<br />
random content when the daemon starts, and deleted when it<br />
exits. Its contents are used as an authentication token. Read<br />
access to this file controls who can access through RPC. By
default<br />
it is stored in the data directory but its location can be
overridden<br />
with the option -rpccookiefile.</div>
<div class="sourceCode" id="cb5"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabindex="-1"></a><span class="va">rpcpassword</span><span class="op">=&lt;</span>password<span class="op">&gt;</span></span></code></pre></div>
<div class="warning">
<div class="title">
<p>Warning</p>
</div>
<div class="line-block">You should still set a secure password (or rely
on the auth cookie<br />
that is generated when you don't supply the rpcpassword option)<br />
even if you don't expose the RPC port to external interfaces,<br />
because of the existence of DNS rebinding attacks (see<br />
<a
href="https://en.wikipedia.org/wiki/DNS_rebinding">https://en.wikipedia.org/wiki/DNS_rebinding</a>
for more information).<br />
<br />
To generate a password that contains enough randomness to protect
your<br />
keys, you could use the following command (on Linux)...</div>
</div>
<div class="sourceCode" id="cb6"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb6-1"><a href="#cb6-1" aria-hidden="true" tabindex="-1"></a><span class="ex">$</span>  dd if=/dev/random bs=32 count=1 <span class="dv">2</span><span class="op">&gt;</span>/dev/null <span class="kw">|</span> <span class="fu">base64</span></span></code></pre></div></td>
</tr>
<tr class="odd">
<td>rpcclienttimeout</td>
<td><div class="line-block">How many seconds Zcash will wait for a
complete RPC HTTP request.<br />
after the HTTP connection is established.</div>
<div class="sourceCode" id="cb7"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb7-1"><a href="#cb7-1" aria-hidden="true" tabindex="-1"></a><span class="va">rpcclienttimeout</span><span class="op">=</span>30</span></code></pre></div></td>
</tr>
<tr class="even">
<td>rpcallowip</td>
<td><div class="line-block">By default, only RPC connections from
localhost are allowed.<br />
Specify as many rpcallowip= settings as you require to allow<br />
insecure connections from other hosts, either as a single
IPv4/IPv6<br />
or with a subnet specification. Without further security controls,<br />
an attacker who can see your network traffic will be able to take<br />
over your node.</div>
<div class="warning">
<div class="title">
<p>Warning</p>
</div>
<div class="line-block">Using the RPC port over a remote interface is
NOT RECOMMENDED, because<br />
that will cause the rpcpassword to be transmitted over the network<br />
unencrypted, allowing any observer to steal your keys + Zcash and
take<br />
over the OS account running zcashd<br />
(see <a
href="https://github.com/zcash/zcash/issues/1497">https://github.com/zcash/zcash/issues/1497</a>).</div>
</div>
<div class="sourceCode" id="cb8"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb8-1"><a href="#cb8-1" aria-hidden="true" tabindex="-1"></a><span class="va">rpcallowip</span><span class="op">=</span>127.0.0.1/255.255.255.0</span>
<span id="cb8-2"><a href="#cb8-2" aria-hidden="true" tabindex="-1"></a><span class="va">rpcallowip</span><span class="op">=</span>127.0.0.1/24</span>
<span id="cb8-3"><a href="#cb8-3" aria-hidden="true" tabindex="-1"></a><span class="va">rpcallowip</span><span class="op">=</span>::1/128</span></code></pre></div></td>
</tr>
<tr class="odd">
<td>rpcport</td>
<td><p>Listen for RPC connections on this TCP port:</p>
<div class="sourceCode" id="cb9"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb9-1"><a href="#cb9-1" aria-hidden="true" tabindex="-1"></a><span class="va">rpcport</span><span class="op">=</span>83232</span></code></pre></div></td>
</tr>
<tr class="even">
<td>rpcconnect</td>
<td><div class="line-block">You can use Zcash or zcashd to send commands
to Zcash/zcashd<br />
running on another host using this option:</div>
<div class="sourceCode" id="cb10"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb10-1"><a href="#cb10-1" aria-hidden="true" tabindex="-1"></a><span class="va">rpcconnect</span><span class="op">=</span>127.0.0.1</span></code></pre></div></td>
</tr>
</tbody>
</table>

## Transaction Fee

<table>
<colgroup>
<col style="width: 19%" />
<col style="width: 80%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Parameter</strong></td>
<td><strong>Description &amp; Example</strong></td>
</tr>
<tr class="even">
<td>sendfreetransactions</td>
<td><p>Send transactions as zero-fee transactions if possible (default:
0)</p>
<div class="sourceCode" id="cb1"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="va">sendfreetransactions</span><span class="op">=</span>1</span></code></pre></div></td>
</tr>
<tr class="odd">
<td>txconfirmtarget</td>
<td><div class="line-block">Create transactions that have enough fees
(or priority) so they are<br />
likely to # begin confirmation within n blocks (default: 1). This<br />
setting is overridden by the -paytxfee option.</div>
<div class="sourceCode" id="cb2"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a><span class="va">txconfirmtarget</span><span class="op">=</span>n</span></code></pre></div></td>
</tr>
</tbody>
</table>

## Miscellaneous Options

<table>
<colgroup>
<col style="width: 19%" />
<col style="width: 80%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Parameter</strong></td>
<td><strong>Description &amp; Example</strong></td>
</tr>
<tr class="even">
<td>gen</td>
<td><p>Enable attempt to mine Zcash.</p>
<div class="sourceCode" id="cb1"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="va">gen</span><span class="op">=</span>1</span></code></pre></div></td>
</tr>
<tr class="odd">
<td>txindex</td>
<td><div class="line-block">Maintain a full transaction index, used by
the getrawtransaction rpc,<br />
partitioncheck, pow, proxy, prune, rand, reindex, rpc, selectcoins,
tor.</div>
<div class="sourceCode" id="cb2"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a><span class="va">txindex</span><span class="op">=</span>1</span></code></pre></div></td>
</tr>
<tr class="even">
<td>genproclimit</td>
<td><p>Set the number of threads to be used for mining Zcash (-1 = all
cores).</p>
<div class="sourceCode" id="cb3"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a><span class="va">genproclimit</span><span class="op">=</span>1</span></code></pre></div></td>
</tr>
<tr class="odd">
<td>equihashsolver</td>
<td><div class="line-block">Specify a different Equihash solver (e.g.
"tromp") to try to mine Zcash<br />
faster when gen=1.</div>
<div class="sourceCode" id="cb4"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a><span class="va">equihashsolver</span><span class="op">=</span>default</span></code></pre></div></td>
</tr>
<tr class="even">
<td>keypool</td>
<td><div class="line-block">Pre-generate this many public/private key
pairs, so wallet backups will be valid for<br />
both prior transactions and several dozen future transactions.</div>
<div class="sourceCode" id="cb5"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabindex="-1"></a><span class="va">keypool</span><span class="op">=</span>100</span></code></pre></div></td>
</tr>
<tr class="odd">
<td>paytxfee</td>
<td><div class="line-block">Pay an optional transaction fee every time
you send Zcash. Transactions with fees<br />
are more likely than free transactions to be included in generated
blocks, so may<br />
be validated sooner. This setting does not affect private transactions
created with<br />
<code>z_sendmany</code></div>
<div class="sourceCode" id="cb6"><pre
class="sourceCode bash"><code class="sourceCode bash"><span id="cb6-1"><a href="#cb6-1" aria-hidden="true" tabindex="-1"></a><span class="va">paytxfee</span><span class="op">=</span>0.00</span></code></pre></div></td>
</tr>
</tbody>
</table>
