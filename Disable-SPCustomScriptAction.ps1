<#
.SYNOPSIS
Disables the Custom Script 

.EXAMPLE
PS C:\> .\Disable-SPCustomScriptAction.ps1 -TargetSiteUrl "https://intranet.mydomain.com/sites/targetSite"

.EXAMPLE
PS C:\> $creds = Get-Credential
PS C:\> .\Disable-SPCustomScriptAction.ps1 -TargetSiteUrl "https://intranet.mydomain.com/sites/targetSite" -Credentials $creds
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

if($Credentials -eq $null)
{
	$Credentials = Get-Credential -Message "Enter Admin Credentials"
}

Write-Host -ForegroundColor White "--------------------------------------------------------"
Write-Host -ForegroundColor White "|            Disabling QL Dropdown            |"
Write-Host -ForegroundColor White "--------------------------------------------------------"

Write-Host -ForegroundColor Yellow "Target Site URL: $TargetSiteUrl"

try
{
    Connect-PnPOnline $TargetSiteUrl -Credentials $Credentials

    $customAction = Get-PnPCustomAction -Scope Site | Where-Object { $_.Name -eq "QL_Dropdown" }
    Remove-PnPCustomAction -Identity $customAction.Id -Scope Site -Force
    Remove-PnPFolder -Name QuickLaunch -Folder "$($configObject.siteUrl)/Style Library/"  -Force 
    $subwebs = Get-PnPSubWebs -Recurse
    Foreach ($web in $subwebs)
     {
        $customActionWebs = Get-PnPCustomAction -Scope Web | Where-Object { $_.Name -eq "QL_Dropdown_Webs" }
        Remove-PnPCustomAction -Identity $customActionWebs.Id -Scope Web -Force
        Write-Host -ForegroundColor Green "Custom Action removal succeeded in subsites."
     }

    Write-Host -ForegroundColor Green "Custom Script Action  removal succeded"
}
catch
{
    Write-Host -ForegroundColor Red "Exception occurred!" 
    Write-Host -ForegroundColor Red "Exception Type: $($_.Exception.GetType().FullName)"
    Write-Host -ForegroundColor Red "Exception Message: $($_.Exception.Message)"
}