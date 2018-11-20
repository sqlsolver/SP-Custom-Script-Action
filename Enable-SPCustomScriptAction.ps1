<#
.SYNOPSIS
Enables deployment of customizations to SPO via custom actions

.EXAMPLE
PS C:\> .\Enable-SPCustomScriptAction.ps1 -TargetSiteUrl "https://intranet.mydomain.com/sites/targetSite"

.EXAMPLE
PS C:\> $creds = Get-Credential
PS C:\> .\Enable-SPCustomScriptAction.ps1 -TargetSiteUrl "https://intranet.mydomain.com/sites/targetSite" -Credentials $creds
#>

[CmdletBinding()]
param
(
    [Parameter(Mandatory = $true, HelpMessage="Enter the URL of the target site collection, e.g. 'https://intranet.mydomain.com/sites/targetSite'")]
    [String]
    $TargetSiteUrl,

    [Parameter(Mandatory = $false, HelpMessage="Optional administration credentials")]
    [PSCredential]
    $Credentials
)

if($Credentials -eq $null) {
        $Credentials = Get-Credential -Message "Enter Admin Credentials"
    }

Write-Host -ForegroundColor White "--------------------------------------------------------"
Write-Host -ForegroundColor White "|            Enabling Custom Actions             |"
Write-Host -ForegroundColor White "--------------------------------------------------------"

Write-Host -ForegroundColor Yellow "Target Site URL: $targetSiteUrl"
$dateStamp = Get-Date -Format "yyyy-MM-dd-hhmm"
$logFileName = ".\" + $dateStamp + "_" + $MyInvocation.MyCommand.Name.Replace(".ps1", "") + ".log"
Set-PnPTraceLog -On -LogFile ./logs/$logFileName -Level Debug
Connect-PnPOnline -Url $targetSiteUrl -Credentials $Credentials
try { 
    Apply-PnPProvisioningTemplate -Path .\Custom.QuickLaunch.Template.xml
    Write-Host -ForegroundColor Green "Provisioning custom actions (menu skin and logo) to site collection."
    Write-Host -ForegroundColor Green "Pausing 30 seconds."
    Start-Sleep -Seconds 30
    $subwebs = Get-PnPSubWebs -Recurse
    Foreach ($web in $subwebs) {
        Apply-PnPProvisioningTemplate -Path .\Custom.QuickLaunch.Template.Subsites.xml
        Write-Host -ForegroundColor Green "Custom Action application succeeded in subsites."
        }
    }
catch {
    Write-Host -ForegroundColor Red "Exception occurred! " +  "Exception Type: $($_.Exception.GetType().FullName)"
    Write-Host -ForegroundColor Red "Exception Message: $($_.Exception.Message)"
}